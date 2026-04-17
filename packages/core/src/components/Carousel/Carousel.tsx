import React, { useState, useEffect, useRef, useCallback } from "react";

export interface CarouselSlide {
  content: React.ReactNode;
  background?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  showProgress?: boolean;
  slideHeight?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const NavButton: React.FC<{
  direction: "prev" | "next";
  onClick: () => void;
}> = ({ direction, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        position: "absolute",
        top: "50%",
        transform: pressed
          ? "translateY(-50%) scale(0.9)"
          : hovered
            ? "translateY(-50%) scale(1.1)"
            : "translateY(-50%)",
        [direction === "prev" ? "left" : "right"]: "12px",
        width: "38px",
        height: "38px",
        borderRadius: "12px",
        border: "none",
        background: "var(--neu-bg)",
        boxShadow: pressed
          ? "var(--neu-shadow-inset-sm)"
          : hovered
            ? "var(--neu-shadow-raised)"
            : "var(--neu-shadow-raised-sm)",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: 700,
        color: hovered ? "var(--neu-accent)" : "var(--neu-text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        transition,
        opacity: 0.9,
      }}
    >
      {direction === "prev" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
};

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = false,
  interval = 4000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
  showProgress = false,
  slideHeight = 200,
  className,
  style,
  ...rest
}) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  const goTo = useCallback((idx: number, dir?: "left" | "right") => {
    if (!loop && (idx < 0 || idx >= count)) return;
    setDirection(dir || (idx > current ? "right" : "left"));
    setCurrent(((idx % count) + count) % count);
    setProgress(0);
  }, [count, current, loop]);

  const next = useCallback(() => goTo(current + 1, "right"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "left"), [current, goTo]);

  // Auto play + progress bar
  useEffect(() => {
    if (autoPlay && count > 1 && !paused) {
      const startTime = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / interval) * 100, 100));
      }, 30);

      timerRef.current = setTimeout(() => {
        next();
      }, interval);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
      };
    }
    setProgress(0);
  }, [autoPlay, interval, count, paused, current, next]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  }, [prev, next]);

  // Touch/drag support
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStart.current = clientX;
    dragOffset.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    dragOffset.current = clientX - dragStart.current;
    if (trackRef.current) {
      const baseTranslate = -(current * 100);
      const dragPercent = (dragOffset.current / (trackRef.current.parentElement?.offsetWidth || 1)) * 100;
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.transition = "";
      trackRef.current.style.transform = "";
    }
    const threshold = 50;
    if (dragOffset.current < -threshold) next();
    else if (dragOffset.current > threshold) prev();
  };

  return (
    <div
      className={className}
      style={style}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
      {...rest}
    >
      {/* Main container with neumorphic frame */}
      <div
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => { pauseOnHover && setPaused(false); handleDragEnd(); }}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised)",
        }}
      >
        {/* Progress bar */}
        {showProgress && autoPlay && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "3px",
              width: `${progress}%`,
              background: "var(--neu-accent)",
              borderRadius: "0 2px 2px 0",
              zIndex: 3,
              transition: progress === 0 ? "none" : "width 0.05s linear",
              opacity: 0.8,
            }}
          />
        )}

        {/* Slides track */}
        <div
          ref={trackRef}
          data-testid="carousel-track"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          style={{
            display: "flex",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translateX(-${current * 100}%)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
              style={{
                minWidth: "100%",
                height: typeof slideHeight === "number" ? `${slideHeight}px` : slideHeight,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
                background:
                  slide.background ||
                  "linear-gradient(135deg, var(--neu-accent-light), var(--neu-accent))",
                boxSizing: "border-box",
                userSelect: "none",
              }}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {/* Nav buttons */}
        {showArrows && count > 1 && (
          <>
            <NavButton direction="prev" onClick={prev} />
            <NavButton direction="next" onClick={next} />
          </>
        )}

        {/* Slide counter */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "12px",
            padding: "3px 10px",
            borderRadius: "8px",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
            zIndex: 2,
          }}
        >
          {current + 1} / {count}
        </div>
      </div>

      {/* Dots */}
      {showDots && count > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "14px",
          }}
        >
          {slides.map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: isActive ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? "var(--neu-accent)" : "var(--neu-bg)",
                  boxShadow: isActive
                    ? `0 0 8px var(--neu-accent-glow)`
                    : "var(--neu-shadow-raised-sm)",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

Carousel.displayName = "Carousel";
