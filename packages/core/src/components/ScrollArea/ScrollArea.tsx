import React, { useRef, useState, useEffect, useCallback } from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
  /** Maximum height before scrolling */
  maxHeight?: number | string;
  /** Hide the custom scrollbar */
  hideScrollbar?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "opacity 0.25s ease";

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  maxHeight = 300,
  hideScrollbar = false,
  className,
  style,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ y: 0, scrollTop: 0 });
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateThumb = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const ratio = el.clientHeight / el.scrollHeight;
    if (ratio >= 1) {
      setThumbHeight(0);
      return;
    }
    const trackH = el.clientHeight - 8;
    setThumbHeight(Math.max(ratio * trackH, 24));
    setThumbTop(4 + (el.scrollTop / (el.scrollHeight - el.clientHeight)) * (trackH - Math.max(ratio * trackH, 24)));
  }, []);

  useEffect(() => {
    updateThumb();
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateThumb]);

  const showScrollbar = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging) setVisible(false);
    }, 1200);
  }, [dragging]);

  const handleScroll = () => {
    updateThumb();
    showScrollbar();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { y: e.clientY, scrollTop: contentRef.current?.scrollTop || 0 };
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent) => {
      const el = contentRef.current;
      if (!el) return;
      const trackH = el.clientHeight - 8;
      const ratio = el.scrollHeight / trackH;
      const dy = e.clientY - dragStart.current.y;
      el.scrollTop = dragStart.current.scrollTop + dy * ratio;
    };
    const handleUp = () => {
      setDragging(false);
      hideTimer.current = setTimeout(() => setVisible(false), 800);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [dragging]);

  if (hideScrollbar) {
    return (
      <div
        className={className}
        style={{
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto",
          borderRadius: "16px",
          scrollbarWidth: "none",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ position: "relative", ...style }}
      onMouseEnter={showScrollbar}
      onMouseLeave={() => { if (!dragging) setVisible(false); }}
    >
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto",
          scrollbarWidth: "none",
          borderRadius: "16px",
        }}
      >
        {children}
      </div>

      {/* Custom scrollbar */}
      {thumbHeight > 0 && (
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            bottom: "4px",
            width: "8px",
            borderRadius: "4px",
            background: "transparent",
            opacity: visible || dragging ? 1 : 0,
            transition,
            zIndex: 2,
          }}
        >
          <div
            ref={thumbRef}
            onMouseDown={handleMouseDown}
            role="scrollbar"
            aria-controls="scroll-area-content"
            aria-valuenow={Math.round(thumbTop)}
            tabIndex={0}
            aria-label="Scroll"
            style={{
              position: "absolute",
              top: `${thumbTop}px`,
              left: "1px",
              width: "6px",
              height: `${thumbHeight}px`,
              borderRadius: "3px",
              background: "var(--neu-text-muted)",
              opacity: 0.5,
              cursor: "pointer",
              boxShadow: "var(--neu-shadow-raised-sm)",
              transition: dragging ? "none" : "top 0.08s ease",
            }}
          />
        </div>
      )}
    </div>
  );
};

ScrollArea.displayName = "ScrollArea";
