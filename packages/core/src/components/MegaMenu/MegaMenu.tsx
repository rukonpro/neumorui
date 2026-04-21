import React from "react";

export interface MegaMenuItem {
  label: string;
  panel: React.ReactNode;
}

interface MegaMenuProps {
  /** Menu items with expandable panels */
  items: MegaMenuItem[];
  className?: string;
  style?: React.CSSProperties;
}

const scaleInKeyframes = `
@keyframes neu-mega-scale-in {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
`;

export const MegaMenu: React.FC<MegaMenuProps> = ({
  items,
  className,
  style,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveIndex(index);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 150);
  };

  return (
    <>
      <style>{scaleInKeyframes}</style>
      {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <nav
        className={className}
        style={{
          display: "flex",
          gap: "4px",
          position: "relative",
          ...style,
        }}
        role="menubar"
        {...rest}
      >
      {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
        {items.map((item, i) => (
          <div
            key={i}
            style={{ position: "relative" }}
            onMouseEnter={() => openMenu(i)}
            onMouseLeave={scheduleClose}
          >
            {/* Trigger */}
            <button
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeIndex === i}
              style={{
                padding: "9px 16px",
                borderRadius: "11px",
                fontSize: "13px",
                fontWeight: 700,
                color:
                  activeIndex === i
                    ? "var(--neu-accent)"
                    : "var(--neu-text-secondary)",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                boxShadow:
                  activeIndex === i
                    ? "var(--neu-shadow-raised-sm)"
                    : "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
              }}
            >
              {item.label}
            </button>

            {/* Panel */}
            {activeIndex === i && (
              <div
                data-testid={`mega-panel-${i}`}
                onMouseEnter={() => openMenu(i)}
                onMouseLeave={scheduleClose}
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  borderRadius: "20px",
                  boxShadow: "var(--neu-shadow-raised-lg)",
                  background: "var(--neu-bg)",
                  padding: "14px",
                  minWidth: "300px",
                  zIndex: 50,
                  animation: "neu-mega-scale-in 0.2s ease",
                }}
              >
                {item.panel}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

MegaMenu.displayName = "MegaMenu";
