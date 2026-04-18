import React, { useState, useRef, useCallback, useEffect } from "react";

interface ResizablePanelsProps {
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children: [React.ReactNode, React.ReactNode];
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.15s ease";

export const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  direction = "horizontal",
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  children,
  className,
  style,
}) => {
  const [size, setSize] = useState(defaultSize);
  const [dragging, setDragging] = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHorizontal = direction === "horizontal";

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let pct: number;
      if (isHorizontal) {
        pct = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        pct = ((e.clientY - rect.top) / rect.height) * 100;
      }
      setSize(Math.min(Math.max(pct, minSize), maxSize));
    };

    const handleUp = () => setDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, isHorizontal, minSize, maxSize]);

  // Touch support
  useEffect(() => {
    if (!dragging) return;

    const handleTouch = (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      let pct: number;
      if (isHorizontal) {
        pct = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      } else {
        pct = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
      }
      setSize(Math.min(Math.max(pct, minSize), maxSize));
    };

    const handleEnd = () => setDragging(false);

    document.addEventListener("touchmove", handleTouch);
    document.addEventListener("touchend", handleEnd);
    return () => {
      document.removeEventListener("touchmove", handleTouch);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, isHorizontal, minSize, maxSize]);

  const handleStyle: React.CSSProperties = isHorizontal
    ? {
        width: "12px",
        cursor: "col-resize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }
    : {
        height: "12px",
        cursor: "row-resize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      };

  const dotStyle: React.CSSProperties = {
    width: isHorizontal ? "4px" : "24px",
    height: isHorizontal ? "24px" : "4px",
    borderRadius: "2px",
    background: dragging || handleHovered ? "var(--neu-accent)" : "var(--neu-text-muted)",
    opacity: dragging || handleHovered ? 0.8 : 0.3,
    boxShadow: "var(--neu-shadow-raised-sm)",
    transition,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        borderRadius: "16px",
        overflow: "hidden",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset)",
        userSelect: dragging ? "none" : "auto",
        ...style,
      }}
    >
      {/* Panel 1 */}
      <div
        style={{
          [isHorizontal ? "width" : "height"]: `${size}%`,
          overflow: "auto",
          flexShrink: 0,
        }}
      >
        {children[0]}
      </div>

      {/* Handle — separator with aria-valuenow is interactive per WAI-ARIA */}
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={() => setDragging(true)}
        onMouseEnter={() => setHandleHovered(true)}
        onMouseLeave={() => setHandleHovered(false)}
        role="separator"
        aria-orientation={isHorizontal ? "vertical" : "horizontal"}
        aria-valuenow={Math.round(size)}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        tabIndex={0}
        aria-label="Resize handle"
        style={handleStyle}
      >
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
        <div style={dotStyle} />
      </div>

      {/* Panel 2 */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {children[1]}
      </div>
    </div>
  );
};

ResizablePanels.displayName = "ResizablePanels";
