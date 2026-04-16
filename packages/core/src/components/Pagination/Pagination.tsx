import React from "react";
import { cn } from "../../utils/cn";

interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblings?: number;
  size?: "sm" | "md" | "lg";
}

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const buildPages = (current: number, total: number, siblings: number): (number | "ellipsis")[] => {
  const totalPageNumbers = siblings * 2 + 5;
  if (total <= totalPageNumbers) return range(1, total);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblings * 2), "ellipsis", total];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis", ...range(total - (3 + siblings * 2) + 1, total)];
  }
  return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", total];
};

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onChange,
  siblings = 1,
  size = "md",
  className,
  ...props
}) => {
  const pages = buildPages(page, total, siblings);
  const canPrev = page > 1;
  const canNext = page < total;

  const btnBase = cn(
    "flex items-center justify-center font-medium rounded-neu neu-transition cursor-pointer outline-none",
    "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    sizeClasses[size]
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      <button
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className={btnBase}
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-secondary)",
        }}
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className={cn("flex items-center justify-center", sizeClasses[size])}
            style={{ color: "var(--neu-text-muted)" }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={btnBase}
            style={
              p === page
                ? {
                    background: "var(--neu-gradient-primary)",
                    color: "#fff",
                    boxShadow:
                      "3px 3px 8px var(--neu-accent-glow), -2px -2px 6px var(--neu-shadow-light)",
                  }
                : {
                    background: "var(--neu-bg)",
                    boxShadow: "var(--neu-shadow-raised-sm)",
                    color: "var(--neu-text-primary)",
                  }
            }
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className={btnBase}
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-secondary)",
        }}
      >
        ›
      </button>
    </nav>
  );
};
