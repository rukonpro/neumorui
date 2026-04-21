import React from "react";

interface KanbanTag {
  label: string;
  variant?: "green" | "coral" | "blue" | "yellow";
}

interface KanbanItem {
  id: string;
  title: string;
  tag?: KanbanTag;
  assignee?: string;
  progress?: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  count?: number;
  countColor?: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  /** Array of kanban columns with items */
  columns: KanbanColumn[];
  className?: string;
  style?: React.CSSProperties;
}

const tagColors: Record<string, { bg: string; text: string }> = {
  green: { bg: "var(--neu-tint-green-bg, #d4f3e8)", text: "var(--neu-tint-green-text, #1f8a5e)" },
  coral: { bg: "var(--neu-tint-coral-bg, #fde0dc)", text: "var(--neu-tint-coral-text, #c93a28)" },
  blue: { bg: "var(--neu-tint-blue-bg, #dde2fd)", text: "var(--neu-tint-blue-text, #3d4fd4)" },
  yellow: { bg: "var(--neu-tint-yellow-bg, #fef3cc)", text: "var(--neu-tint-yellow-text, #9a7010)" },
};

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const KanbanCard: React.FC<{ item: KanbanItem }> = ({ item }) => {
  const [hovered, setHovered] = React.useState(false);
  const tc = item.tag ? tagColors[item.tag.variant || "blue"] : null;

  return (
    <div
      data-testid={`kanban-card-${item.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px",
        borderRadius: "14px",
        boxShadow: hovered ? "var(--neu-shadow-raised)" : "var(--neu-shadow-raised-sm)",
        cursor: "grab",
        transition,
        background: "var(--neu-bg)",
        transform: hovered ? "translateY(-2px)" : undefined,
      }}
    >
      <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)", margin: "0 0 6px" }}>
        {item.title}
      </p>
      {item.progress !== undefined && (
        <div
          style={{
            height: "4px",
            borderRadius: "999px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              width: `${item.progress}%`,
              height: "100%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #8490fa, #5a6cf5)",
            }}
          />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {item.tag && tc && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "9px",
              fontWeight: 800,
              padding: "4px 13px",
              borderRadius: "999px",
              boxShadow: "var(--neu-shadow-raised-sm)",
              background: tc.bg,
              color: tc.text,
            }}
          >
            {item.tag.label}
          </span>
        )}
        {item.assignee && (
          <span style={{ fontSize: "11px", color: "var(--neu-text-muted)" }}>{item.assignee}</span>
        )}
        {item.progress !== undefined && (
          <span style={{ fontSize: "11px", color: "var(--neu-text-muted)" }}>{item.progress}%</span>
        )}
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, className, style, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: "12px",
        ...style,
      }}
      {...rest}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          data-testid={`kanban-col-${col.id}`}
          style={{
            background: "var(--neu-bg)",
            borderRadius: "18px",
            padding: "14px",
            boxShadow: "var(--neu-shadow-inset)",
            minHeight: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--neu-text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {col.title}
            </span>
            {col.count !== undefined && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: col.countColor || "var(--neu-tint-blue-bg, #dde2fd)",
                  color: "var(--neu-text-secondary)",
                }}
              >
                {col.count}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {col.items.map((item) => (
              <KanbanCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

KanbanBoard.displayName = "KanbanBoard";
