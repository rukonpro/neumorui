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

export const ContextMenu: React.FC<ContextMenuProps> = ({ trigger, items, className, style, ...rest }) => {
  const [visible, setVisible] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  React.useEffect(() => {
    if (!visible) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [visible]);

  return (
    <>
      <div className={className} onContextMenu={handleContextMenu} style={{ display: "inline-block", ...style }} {...rest}>
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
