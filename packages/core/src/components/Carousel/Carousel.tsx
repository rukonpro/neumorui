import React from "react";

export interface CarouselSlide {
  content: React.ReactNode;
  background?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = false,
  interval = 4000,
  className,
  style,
}) => {
  const [current, setCurrent] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  const goTo = (idx: number) => {
    setCurrent((idx + count) % count);
  };

  React.useEffect(() => {
    if (autoPlay && count > 1) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % count);
      }, interval);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [autoPlay, interval, count]);

  const navBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    border: "none",
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    cursor: "pointer",
    fontSize: "16px",
    color: "var(--neu-text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
  };

  return (
    <div className={className} style={style}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        {/* Slides track */}
        <div
          data-testid="carousel-track"
          style={{
            display: "flex",
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                minWidth: "100%",
                height: "160px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                textAlign: "center",
                padding: "20px",
                background:
                  slide.background ||
                  "linear-gradient(135deg, var(--neu-accent-light), var(--neu-accent))",
                boxSizing: "border-box",
              }}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {/* Prev */}
        <button
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
          style={{ ...navBtnStyle, left: "8px" }}
        >
          &#8249;
        </button>

        {/* Next */}
        <button
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
          style={{ ...navBtnStyle, right: "8px" }}
        >
          &#8250;
        </button>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          marginTop: "10px",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "20px" : "8px",
              height: "8px",
              borderRadius: i === current ? "999px" : "50%",
              background:
                i === current
                  ? "var(--neu-accent)"
                  : "var(--neu-text-muted)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.displayName = "Carousel";
