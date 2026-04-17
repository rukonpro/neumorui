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

const sizeMap: Record<string, { box: number; fontSize: string; radius: string }> = {
  sm: { box: 34, fontSize: "12px", radius: "10px" },
  md: { box: 42, fontSize: "14px", radius: "12px" },
  lg: { box: 50, fontSize: "16px", radius: "14px" },
};

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const PaginationButton: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  size: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaCurrent?: "page" | undefined;
}> = ({ children, active, disabled, size, onClick, ariaLabel, ariaCurrent }) => {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const { box, fontSize, radius } = sizeMap[size];

  const style: React.CSSProperties = {
    width: box,
    height: box,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize,
    borderRadius: radius,
    background: "var(--neu-bg)",
    color: "var(--neu-text-primary)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    transition,
  };

  if (active) {
    style.boxShadow = "var(--neu-shadow-inset-sm)";
    style.color = "var(--neu-accent)";
    style.fontWeight = 800;
    style.transform = "scale(0.97)";
  } else if (pressed && !disabled) {
    style.boxShadow = "var(--neu-shadow-inset-sm)";
    style.transform = "scale(0.95)";
  } else if (hovered && !disabled) {
    style.boxShadow = "var(--neu-shadow-raised)";
    style.transform = "translateY(-2px)";
    style.color = "var(--neu-accent)";
  }

  if (disabled) {
    style.opacity = 0.4;
    style.cursor = "not-allowed";
    style.transform = "none";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </button>
  );
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
  const { box, fontSize } = sizeMap[size];

  return (
    <nav
      aria-label="Pagination"
      className={cn(className)}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
      {...props}
    >
      <PaginationButton
        size={size}
        disabled={!canPrev}
        onClick={() => canPrev && onChange(page - 1)}
        ariaLabel="Previous page"
      >
        ‹
      </PaginationButton>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`e-${i}`}
            style={{
              width: box,
              height: box,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--neu-text-muted)",
              fontSize,
              fontWeight: 700,
            }}
          >
            …
          </span>
        ) : (
          <PaginationButton
            key={p}
            size={size}
            active={p === page}
            onClick={() => onChange(p)}
            ariaCurrent={p === page ? "page" : undefined}
          >
            {p}
          </PaginationButton>
        )
      )}

      <PaginationButton
        size={size}
        disabled={!canNext}
        onClick={() => canNext && onChange(page + 1)}
        ariaLabel="Next page"
      >
        ›
      </PaginationButton>
    </nav>
  );
};
