import React from "react";

interface ContextMenuItem {
  label?: string;
  icon?: React.ReactNode;
  danger?: boolean;
  separator?: boolean;
  onSelect?: () => void;
}

interface ContextMenuProps {
  /** Element that activates the context menu */
  trigger: React.ReactNode;
  /** Menu items to display on right-click */
  items: ContextMenuItem[];
  className?: string;
  style?: React.CSSProperties;
}

const menuStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 50,
  borderRadius: "16px",
  boxShadow: "var(--neu-shadow-raised-lg)",
  background: "var(--neu-bg)",
  minWidth: "180px",
  overflow: "hidden",
  animation: "neu-slide-down 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

const itemBase: React.CSSProperties = {
  padding: "9px 14px",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "none",
  background: "none",
  width: "100%",
  textAlign: "left",
  color: "var(--neu-text-primary)",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const separatorStyle: React.CSSProperties = {
  height: "1px",
  background: "var(--neu-text-muted)",
  opacity: 0.2,
  margin: "4px 0",
};

const LONG_PRESS_MS = 500;
const MOVE_THRESHOLD_PX = 10;

export const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, items, className, style, ...rest }) => {
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const longPressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    touchStart.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    touchStart.current = { x: e.clientX, y: e.clientY };
    longPressTimer.current = setTimeout(() => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      longPressTimer.current = null;
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!touchStart.current) return;
    const dx = e.clientX - touchStart.current.x;
    const dy = e.clientY - touchStart.current.y;
    if (Math.hypot(dx, dy) > MOVE_THRESHOLD_PX) cancelLongPress();
  };

  React.useEffect(() => () => cancelLongPress(), []);

  React.useEffect(() => {
    if (!visible) return;
    const handleClick = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    document.addEventListener("pointerdown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [visible]);

  return (
    <>
      <div
        className={className}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={cancelLongPress}
        onPointerCancel={cancelLongPress}
        style={{
          display: "inline-block",
          WebkitTouchCallout: "none",
          ...style,
        }}
        {...rest}
      >
        {trigger}
      </div>
      {visible && (
        <div
          ref={menuRef}
          role="menu"
          style={{ ...menuStyle, left: pos.x, top: pos.y }}
          data-testid="context-menu"
        >
          {items.map((item, i) => {
            if (item.separator) {
              return <div key={i} style={separatorStyle} role="separator" />;
            }
            const isHovered = hoveredIndex === i;
            return (
              <button
                key={i}
                role="menuitem"
                style={{
                  ...itemBase,
                  ...(item.danger ? { color: "var(--neu-danger)" } : {}),
                  ...(isHovered ? { boxShadow: "var(--neu-shadow-inset-sm)" } : {}),
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  item.onSelect?.();
                  setVisible(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

ContextMenu.displayName = "ContextMenu";
