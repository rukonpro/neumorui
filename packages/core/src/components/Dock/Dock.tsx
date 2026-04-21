import React, { useState, useRef, useCallback } from "react";

export interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
}

interface DockProps {
  /** Dock items with icons and actions */
  items: DockItem[];
  /** Dock placement on screen */
  position?: "bottom" | "top";
  /** Max scale factor on hover */
  magnification?: number;
  /** Base icon size in pixels */
  baseSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)";

export const Dock: React.FC<DockProps> = ({
  items,
  position = "bottom",
  magnification = 1.6,
  baseSize = 48,
  className,
  style,
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [tooltipIdx, setTooltipIdx] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  }, []);

  const handleMouseLeave = () => {
    setMouseX(null);
    setTooltipIdx(null);
  };

  const getScale = (index: number): number => {
    if (mouseX === null) return 1;
    const itemCenter = index * (baseSize + 8) + baseSize / 2 + 12;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = baseSize * 2.5;
    if (distance > maxDistance) return 1;
    const scale = 1 + (magnification - 1) * (1 - distance / maxDistance);
    return scale;
  };

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        justifyContent: "center",
        ...style,
      }}
    >
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          padding: "10px 12px",
          borderRadius: "20px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          position: "relative",
        }}
      >
        {items.map((item, i) => {
          const scale = getScale(i);
          return (
            <div
              key={i}
              style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
              onMouseEnter={() => setTooltipIdx(i)}
              onMouseLeave={() => setTooltipIdx(null)}
            >
              {/* Tooltip */}
              {tooltipIdx === i && (
                <div
                  style={{
                    position: "absolute",
                    [position === "bottom" ? "bottom" : "top"]: `${baseSize * scale + 14}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    background: "var(--neu-bg)",
                    boxShadow: "var(--neu-shadow-raised-sm)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--neu-text-primary)",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    animation: "neuDockTip 0.15s ease",
                  }}
                >
                  {item.label}
                </div>
              )}

              {/* Icon button */}
              <button
                type="button"
                onClick={item.onClick}
                style={{
                  width: `${baseSize}px`,
                  height: `${baseSize}px`,
                  borderRadius: "14px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${baseSize * 0.45}px`,
                  background: "var(--neu-bg)",
                  boxShadow: scale > 1.1 ? "var(--neu-shadow-raised)" : "var(--neu-shadow-raised-sm)",
                  transform: `scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition,
                  position: "relative",
                }}
              >
                {item.icon}

                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      minWidth: "16px",
                      height: "16px",
                      borderRadius: "8px",
                      background: "var(--neu-danger)",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                      border: "2px solid var(--neu-bg)",
                    }}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes neuDockTip {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

Dock.displayName = "Dock";
