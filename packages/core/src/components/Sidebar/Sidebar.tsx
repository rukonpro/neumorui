import React from "react";

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  group?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: React.ReactNode;
  brand?: string;
}

const containerStyle: React.CSSProperties = {
  borderRadius: "18px",
  boxShadow: "var(--neu-shadow-inset)",
  padding: "12px",
  background: "var(--neu-bg)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  borderRadius: "12px",
  marginBottom: "8px",
  boxShadow: "var(--neu-shadow-raised-sm)",
};

const groupLabelStyle: React.CSSProperties = {
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--neu-text-muted)",
  padding: "6px 10px",
};

const itemBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "9px 10px",
  borderRadius: "11px",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--neu-text-secondary)",
  cursor: "pointer",
  border: "none",
  background: "none",
  width: "100%",
  textAlign: "left",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const badgeStyle: React.CSSProperties = {
  background: "var(--neu-accent)",
  color: "#fff",
  fontSize: "9px",
  fontWeight: 800,
  padding: "2px 7px",
  borderRadius: "999px",
  marginLeft: "auto",
};

const defaultLogoStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "8px",
  background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "13px",
  fontWeight: 900,
};

export const Sidebar: React.FC<SidebarProps> = ({ items, logo, brand }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Group items
  const groups: { group: string | undefined; items: (SidebarItem & { originalIndex: number })[] }[] = [];
  let currentGroup: string | undefined;
  items.forEach((item, i) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      groups.push({ group: currentGroup, items: [] });
    }
    if (groups.length === 0) {
      groups.push({ group: undefined, items: [] });
    }
    groups[groups.length - 1].items.push({ ...item, originalIndex: i });
  });

  return (
    <div style={containerStyle} role="navigation" data-testid="sidebar">
      {(logo || brand) && (
        <div style={headerStyle}>
          {logo || <div style={defaultLogoStyle}>N</div>}
          {brand && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 900,
                color: "var(--neu-text-primary)",
              }}
            >
              {brand}
            </span>
          )}
        </div>
      )}
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.group && <div style={groupLabelStyle}>{group.group}</div>}
          {group.items.map((item) => {
            const isHovered = hoveredIndex === item.originalIndex;
            const isActive = item.active;
            return (
              <button
                key={item.originalIndex}
                style={{
                  ...itemBase,
                  ...(isActive
                    ? {
                        boxShadow: "var(--neu-shadow-inset-sm)",
                        color: "var(--neu-accent)",
                        fontWeight: 800,
                      }
                    : {}),
                  ...(isHovered && !isActive
                    ? {
                        color: "var(--neu-accent)",
                        transform: "translateX(3px)",
                      }
                    : {}),
                }}
                onMouseEnter={() => setHoveredIndex(item.originalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span style={badgeStyle}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Sidebar.displayName = "Sidebar";
