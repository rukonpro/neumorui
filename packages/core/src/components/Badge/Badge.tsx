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
    boxShadow: "var(--neu-shadow-raised-sm)",
  },
  success: {
    background: "var(--neu-tint-success)",
    color: "var(--neu-tint-success-text)",
    boxShadow: "var(--neu-shadow-raised-sm)",
  },
  danger: {
    background: "var(--neu-tint-danger)",
    color: "var(--neu-tint-danger-text)",
    boxShadow: "var(--neu-shadow-raised-sm)",
  },
  warning: {
    background: "var(--neu-tint-warning)",
    color: "var(--neu-tint-warning-text)",
    boxShadow: "var(--neu-shadow-raised-sm)",
  },
  info: {
    background: "var(--neu-tint-info)",
    color: "var(--neu-tint-info-text)",
    boxShadow: "var(--neu-shadow-raised-sm)",
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
        "inline-flex items-center gap-1.5 text-[11px] font-extrabold px-[13px] py-1 rounded-full",
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
