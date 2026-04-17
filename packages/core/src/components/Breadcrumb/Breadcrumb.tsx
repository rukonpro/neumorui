import React from "react";
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

const DefaultSeparator = () => (
  <span
    className="select-none"
    style={{ color: "var(--neu-text-muted)" }}
    aria-hidden="true"
  >
    ›
  </span>
);

const linkChipStyle: React.CSSProperties = {
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-raised-sm)",
  color: "var(--neu-accent)",
};

const activeChipStyle: React.CSSProperties = {
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-inset-sm)",
  color: "var(--neu-text-secondary)",
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className,
  ...props
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5 flex-wrap text-[13px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const chipClass =
            "inline-flex items-center px-[10px] py-[5px] rounded-[8px] font-bold neu-transition";
          const content =
            item.href && !isLast ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className={cn(chipClass, "hover:-translate-y-0.5")}
                style={linkChipStyle}
              >
                {item.label}
              </a>
            ) : isLast ? (
              <span className={chipClass} style={activeChipStyle}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className={cn(chipClass, "hover:-translate-y-0.5")}
                style={linkChipStyle}
              >
                {item.label}
              </button>
            );

          return (
            <li key={i} className="flex items-center gap-1.5">
              {content}
              {!isLast && (separator ?? <DefaultSeparator />)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
