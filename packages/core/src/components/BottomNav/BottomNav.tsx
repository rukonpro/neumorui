import React from "react";

interface BottomNavItem {
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  isCreate?: boolean;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
}

const containerStyle: React.CSSProperties = {
  background: "var(--neu-bg)",
  borderRadius: "20px",
  boxShadow: "var(--neu-shadow-raised)",
  padding: "8px 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};

const itemBase: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
  padding: "6px 10px",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--neu-text-secondary)",
  border: "none",
  background: "none",
  position: "relative",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const createButtonStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
  boxShadow: "var(--neu-shadow-raised)",
  fontSize: "22px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "0",
  right: "2px",
  background: "var(--neu-danger)",
  color: "#fff",
  fontSize: "8px",
  fontWeight: 800,
  padding: "1px 5px",
  borderRadius: "999px",
  lineHeight: "1.3",
};

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeIndex,
  onActiveChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div style={containerStyle} role="navigation" data-testid="bottom-nav">
      {items.map((item, i) => {
        if (item.isCreate) {
          return (
            <button
              key={i}
              style={createButtonStyle}
              onClick={() => {
                item.onClick?.();
                onActiveChange?.(i);
              }}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          );
        }

        const isActive = activeIndex === i;
        const isHovered = hoveredIndex === i;

        return (
          <button
            key={i}
            style={{
              ...itemBase,
              ...(isActive
                ? {
                    color: "var(--neu-accent)",
                    boxShadow: "var(--neu-shadow-inset-sm)",
                  }
                : {}),
              ...(isHovered && !isActive
                ? { color: "var(--neu-accent)" }
                : {}),
            }}
            onClick={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "scale(0.9)";
              setTimeout(() => { el.style.transform = ""; }, 150);
              item.onClick?.();
              onActiveChange?.(i);
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span style={badgeStyle}>{item.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

BottomNav.displayName = "BottomNav";
