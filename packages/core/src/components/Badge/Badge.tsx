import React from "react";
import { cn } from "../../utils/cn";

type BadgeVariant = "default" | "primary" | "success" | "danger" | "warning" | "info";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyle: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    color: "var(--neu-text-secondary)",
  },
  primary: {
    background: "var(--neu-tint-primary)",
    color: "var(--neu-tint-primary-text)",
    border: "1px solid var(--neu-tint-primary-border)",
  },
  success: {
    background: "var(--neu-tint-success)",
    color: "var(--neu-tint-success-text)",
    border: "1px solid var(--neu-tint-success-border)",
  },
  danger: {
    background: "var(--neu-tint-danger)",
    color: "var(--neu-tint-danger-text)",
    border: "1px solid var(--neu-tint-danger-border)",
  },
  warning: {
    background: "var(--neu-tint-warning)",
    color: "var(--neu-tint-warning-text)",
    border: "1px solid var(--neu-tint-warning-border)",
  },
  info: {
    background: "var(--neu-tint-info)",
    color: "var(--neu-tint-info-text)",
    border: "1px solid var(--neu-tint-info-border)",
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  dot,
  children,
  className,
  style,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full",
        className
      )}
      style={{ ...variantStyle[variant], ...style }}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} />
      )}
      {children}
    </span>
  );
};
