import React, { useState, useRef, useCallback, useEffect } from "react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "bottom" | "top" | "left" | "right";
  title?: string;
  description?: string;
  showHandle?: boolean;
  snapPoints?: number[];
  className?: string;
  style?: React.CSSProperties;
}

const transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";

export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  children,
  side = "bottom",
  title,
  description,
  showHandle = true,
  className,
  style,
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isVertical = side === "bottom" || side === "top";

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  // Reset drag on close
  useEffect(() => {
    if (!open) setDragOffset(0);
  }, [open]);

  const handleDragStart = useCallback((clientPos: number) => {
    setIsDragging(true);
    dragStart.current = clientPos;
  }, []);

  const handleDragMove = useCallback((clientPos: number) => {
    if (!isDragging) return;
    const delta = clientPos - dragStart.current;
    // Only allow dragging in dismiss direction
    if (side === "bottom" && delta > 0) setDragOffset(delta);
    else if (side === "top" && delta < 0) setDragOffset(delta);
    else if (side === "right" && delta > 0) setDragOffset(delta);
    else if (side === "left" && delta < 0) setDragOffset(delta);
  }, [isDragging, side]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = 80;
    if (Math.abs(dragOffset) > threshold) {
      onOpenChange(false);
    }
    setDragOffset(0);
  }, [dragOffset, onOpenChange]);

  // Transform based on side
  const getTransform = () => {
    if (!open) {
      switch (side) {
        case "bottom": return "translateY(100%)";
        case "top": return "translateY(-100%)";
        case "left": return "translateX(-100%)";
        case "right": return "translateX(100%)";
      }
    }
    if (dragOffset !== 0) {
      return isVertical ? `translateY(${dragOffset}px)` : `translateX(${dragOffset}px)`;
    }
    return "translate(0)";
  };

  const getSheetStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "fixed",
      zIndex: 51,
      background: "var(--neu-bg)",
      boxShadow: "var(--neu-shadow-raised-lg)",
      transition: isDragging ? "none" : transition,
      transform: getTransform(),
      display: "flex",
      flexDirection: "column",
      maxHeight: isVertical ? "85vh" : "100vh",
      maxWidth: isVertical ? "100vw" : "85vw",
      overflowY: "auto",
    };

    switch (side) {
      case "bottom":
        return { ...base, bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0" };
      case "top":
        return { ...base, top: 0, left: 0, right: 0, borderRadius: "0 0 24px 24px" };
      case "left":
        return { ...base, top: 0, bottom: 0, left: 0, width: "320px", borderRadius: "0 24px 24px 0" };
      case "right":
        return { ...base, top: 0, bottom: 0, right: 0, width: "320px", borderRadius: "24px 0 0 24px" };
    }
  };

  if (!open && dragOffset === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s ease",
          animation: open ? "fadeIn 0.2s ease" : undefined,
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Sheet"}
        className={className}
        style={{ ...getSheetStyle(), ...style }}
        onMouseDown={(e) => isVertical && handleDragStart(e.clientY)}
        onMouseMove={(e) => isVertical && handleDragMove(e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => isDragging && handleDragEnd()}
        onTouchStart={(e) => handleDragStart(isVertical ? e.touches[0].clientY : e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(isVertical ? e.touches[0].clientY : e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Handle */}
        {showHandle && isVertical && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: side === "bottom" ? "12px 0 4px" : "4px 0 12px",
              cursor: "grab",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "999px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-inset-sm)",
              }}
            />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div style={{ padding: "16px 24px 8px" }}>
            {title && (
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--neu-text-primary)",
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--neu-text-secondary)",
                  margin: "4px 0 0",
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "16px 24px 24px", flex: 1, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </>
  );
};

Sheet.displayName = "Sheet";
