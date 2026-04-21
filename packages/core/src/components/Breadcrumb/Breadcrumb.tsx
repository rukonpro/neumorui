import React, { useState } from "react";
import { cn } from "../../utils/cn";

interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const DefaultSeparator = () => (
  <span
    style={{
      color: "var(--neu-text-muted)",
      fontSize: "14px",
      userSelect: "none",
    }}
    aria-hidden="true"
  >
    ›
  </span>
);

const BreadcrumbChip: React.FC<{
  item: BreadcrumbItem;
  isLast: boolean;
}> = ({ item, isLast }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "inherit",
    border: "none",
    outline: "none",
    textDecoration: "none",
    cursor: isLast ? "default" : "pointer",
    background: "var(--neu-bg)",
    transition,
  };

  if (isLast) {
    style.boxShadow = "var(--neu-shadow-inset-sm)";
    style.color = "var(--neu-text-secondary)";
  } else if (pressed) {
    style.boxShadow = "var(--neu-shadow-inset-sm)";
    style.color = "var(--neu-accent)";
    style.transform = "scale(0.96)";
  } else if (hovered) {
    style.boxShadow = "var(--neu-shadow-raised)";
    style.color = "var(--neu-accent)";
    style.transform = "translateY(-2px)";
  } else {
    style.boxShadow = "var(--neu-shadow-raised-sm)";
    style.color = "var(--neu-accent)";
  }

  const handlers = isLast
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => { setHovered(false); setPressed(false); },
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
      };

  if (item.href && !isLast) {
    return (
      <a href={item.href} onClick={item.onClick} style={style} {...handlers}>
        {item.label}
      </a>
    );
  }

  if (isLast) {
    return <span style={style}>{item.label}</span>;
  }

  return (
    <button type="button" onClick={item.onClick} style={style} {...handlers}>
      {item.label}
    </button>
  );
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(className)}
      {...props}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <BreadcrumbChip item={item} isLast={isLast} />
              {!isLast && (separator ?? <DefaultSeparator />)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
Breadcrumb.displayName = "Breadcrumb";
