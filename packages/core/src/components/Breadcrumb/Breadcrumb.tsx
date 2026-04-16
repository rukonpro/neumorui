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
    /
  </span>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className,
  ...props
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-2 flex-wrap text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const content =
            item.href && !isLast ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className="hover:underline neu-transition"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                {item.label}
              </a>
            ) : isLast ? (
              <span className="font-semibold" style={{ color: "var(--neu-text-primary)" }}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:underline neu-transition"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                {item.label}
              </button>
            );

          return (
            <li key={i} className="flex items-center gap-2">
              {content}
              {!isLast && (separator ?? <DefaultSeparator />)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
