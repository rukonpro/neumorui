import React from "react";

interface BrowserTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  closable?: boolean;
}

interface BrowserTabsProps {
  /** Array of tab definitions */
  tabs: BrowserTab[];
  /** ID of the currently active tab */
  activeTab?: string;
  /** Callback when a tab is selected */
  onTabChange?: (id: string) => void;
  /** Callback when a tab is closed */
  onTabClose?: (id: string) => void;
  /** Callback when the add button is clicked */
  onTabAdd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

export const BrowserTabs: React.FC<BrowserTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onTabClose,
  onTabAdd,
  className,
  style,
  ...rest
}) => {
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "4px",
        overflowX: "auto",
        paddingBottom: "2px",
        ...style,
      }}
      role="tablist"
      data-testid="browser-tabs"
      {...rest}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const isHovered = tab.id === hoveredTab;
        return (
          <div
            key={tab.id}
            data-testid={`tab-${tab.id}`}
            onClick={() => onTabChange?.(tab.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onTabChange?.(tab.id); }}
            role="tab"
            tabIndex={0}
            aria-selected={isActive}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "11px",
              fontSize: "12px",
              fontWeight: 700,
              color: isActive || isHovered ? "var(--neu-accent)" : "var(--neu-text-secondary)",
              cursor: "pointer",
              boxShadow: isActive
                ? "var(--neu-shadow-inset-sm)"
                : "var(--neu-shadow-raised-sm)",
              transition,
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: "var(--neu-bg)",
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  background: "var(--neu-accent)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "999px",
                }}
              >
                {tab.badge}
              </span>
            )}
            {tab.closable !== false && onTabClose && (
              <button
                type="button"
                data-testid={`tab-close-${tab.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
                aria-label={`Close ${tab.label}`}
                style={{
                  marginLeft: "4px",
                  opacity: 0.5,
                  cursor: "pointer",
                  lineHeight: 1,
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "inherit",
                }}
              >
                &#10005;
              </button>
            )}
          </div>
        );
      })}
      {onTabAdd && (
        <button
          onClick={onTabAdd}
          data-testid="tab-add-btn"
          style={{
            minWidth: "32px",
            height: "36px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "var(--neu-bg)",
            color: "var(--neu-text-secondary)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            fontSize: "18px",
            fontWeight: 700,
            flexShrink: 0,
            transition,
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

BrowserTabs.displayName = "BrowserTabs";
