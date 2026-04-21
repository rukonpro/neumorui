import React, { useState, useEffect } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Heading items to list */
  items: TOCItem[];
  /** Controlled active section id */
  activeId?: string;
  /** Called when an item is clicked */
  onItemClick?: (id: string) => void;
  /** Navigation heading text */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId: controlledActiveId,
  onItemClick,
  title = "On this page",
  className,
  style,
}) => {
  const [activeId, setActiveId] = useState(controlledActiveId || items[0]?.id || "");

  // Auto-track scroll position
  useEffect(() => {
    if (controlledActiveId !== undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, controlledActiveId]);

  const currentActive = controlledActiveId || activeId;

  const handleClick = (id: string) => {
    setActiveId(id);
    onItemClick?.(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={className}
      style={{
        padding: "16px",
        borderRadius: "16px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
        ...style,
      }}
      aria-label="Table of contents"
    >
      {title && (
        <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--neu-text-muted)", marginBottom: "10px" }}>
          {title}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {items.map((item) => {
          const isActive = currentActive === item.id;
          const indent = (item.level - 1) * 12;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "6px 10px",
                paddingLeft: `${10 + indent}px`,
                borderRadius: "8px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 600,
                color: isActive ? "var(--neu-accent)" : "var(--neu-text-secondary)",
                background: isActive ? "rgba(108,126,248,0.08)" : "transparent",
                borderLeft: isActive ? "2px solid var(--neu-accent)" : "2px solid transparent",
                transition,
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

TableOfContents.displayName = "TableOfContents";
