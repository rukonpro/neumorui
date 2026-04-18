import React, { useState, useEffect, useCallback } from "react";

interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
  icon?: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";

const sizeMap: Record<string, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

const positionMap: Record<string, React.CSSProperties> = {
  "bottom-right": { bottom: "24px", right: "24px" },
  "bottom-left": { bottom: "24px", left: "24px" },
  "bottom-center": { bottom: "24px", left: "50%", transform: "translateX(-50%)" },
};

const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 14V4M4 8l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  smooth = true,
  icon,
  position = "bottom-right",
  size = "md",
  className,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const box = sizeMap[size];

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }, [smooth]);

  const btnStyle: React.CSSProperties = {
    position: "fixed",
    ...positionMap[position],
    zIndex: 40,
    width: box,
    height: box,
    borderRadius: "14px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--neu-bg)",
    color: hovered ? "var(--neu-accent)" : "var(--neu-text-secondary)",
    boxShadow: pressed
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised-lg)"
        : "var(--neu-shadow-raised)",
    transform: visible
      ? pressed
        ? "scale(0.9)"
        : hovered
          ? "translateY(-4px)"
          : "translateY(0)"
      : "translateY(80px)",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition,
    ...style,
  };

  // Override transform for bottom-center
  if (position === "bottom-center" && visible) {
    btnStyle.transform = pressed
      ? "translateX(-50%) scale(0.9)"
      : hovered
        ? "translateX(-50%) translateY(-4px)"
        : "translateX(-50%)";
  } else if (position === "bottom-center" && !visible) {
    btnStyle.transform = "translateX(-50%) translateY(80px)";
  }

  return (
    <button
      className={className}
      aria-label="Scroll to top"
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={btnStyle}
    >
      {icon || <ArrowUpIcon />}
    </button>
  );
};

BackToTop.displayName = "BackToTop";
