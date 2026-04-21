import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from "react";

interface StreamingTextProps {
  /** Full text to stream character by character */
  text: string;
  /** Characters per second */
  speed?: number;
  /** Delay before starting (ms) */
  startDelay?: number;
  /** Show blinking cursor at end */
  showCursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Called when streaming completes */
  onComplete?: () => void;
  /** Called on each character reveal */
  onCharacter?: (char: string, index: number) => void;
  /** Click to skip to end */
  skipOnClick?: boolean;
  /** Pause streaming */
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface StreamingTextHandle {
  skip: () => void;
  restart: () => void;
  pause: () => void;
  resume: () => void;
}

export const StreamingText = React.forwardRef<StreamingTextHandle, StreamingTextProps>(
  ({
    text,
    speed = 40,
    startDelay = 0,
    showCursor = true,
    cursorChar = "▊",
    onComplete,
    onCharacter,
    skipOnClick = false,
    paused: controlledPaused,
    className,
    style,
  }, ref) => {
    const [displayedCount, setDisplayedCount] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [internalPaused, setInternalPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const startedRef = useRef(false);
    const completedRef = useRef(false);

    const isPaused = controlledPaused ?? internalPaused;

    const skip = useCallback(() => {
      setDisplayedCount(text.length);
      setCompleted(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, [text.length, onComplete]);

    const restart = useCallback(() => {
      setDisplayedCount(0);
      setCompleted(false);
      startedRef.current = false;
      completedRef.current = false;
    }, []);

    useImperativeHandle(ref, () => ({
      skip,
      restart,
      pause: () => setInternalPaused(true),
      resume: () => setInternalPaused(false),
    }), [skip, restart]);

    useEffect(() => {
      if (completed || isPaused) return;

      // Check reduced motion
      const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        skip();
        return;
      }

      if (!startedRef.current) {
        startedRef.current = true;
        if (startDelay > 0) {
          timerRef.current = setTimeout(() => {
            setDisplayedCount(1);
          }, startDelay);
          return () => { if (timerRef.current) clearTimeout(timerRef.current); };
        }
      }

      if (displayedCount < text.length) {
        const interval = 1000 / speed;
        timerRef.current = setTimeout(() => {
          setDisplayedCount((c) => {
            const next = c + 1;
            onCharacter?.(text[c], c);
            if (next >= text.length) {
              setCompleted(true);
              if (!completedRef.current) {
                completedRef.current = true;
                onComplete?.();
              }
            }
            return next;
          });
        }, interval);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
      }
    }, [displayedCount, completed, isPaused, text, speed, startDelay, skip, onComplete, onCharacter]);

    // Reset on text change
    useEffect(() => {
      restart();
    }, [text, restart]);

    const handleClick = () => {
      if (skipOnClick && !completed) skip();
    };

    const animId = React.useId().replace(/:/g, "");

    return (
      <div
        className={className}
        onClick={handleClick}
        role="status"
        aria-live="polite"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1.7,
          color: "var(--neu-text-primary)",
          cursor: skipOnClick && !completed ? "pointer" : "default",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          ...style,
        }}
      >
        {text.slice(0, displayedCount)}
        {showCursor && !completed && (
          <span
            style={{
              color: "var(--neu-accent)",
              fontWeight: 700,
              animation: `neuStreamBlink-${animId} 0.8s step-end infinite`,
            }}
          >
            {cursorChar}
          </span>
        )}
        <style>{`
          @keyframes neuStreamBlink-${animId} {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
);

StreamingText.displayName = "StreamingText";
