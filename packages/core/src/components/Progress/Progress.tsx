import React from "react";
import { cn } from "../../utils/cn";

type ProgressVariant = "default" | "success" | "danger" | "warning";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const trackHeight = { sm: "h-1", md: "h-2", lg: "h-3" };

const fillColors: Record<ProgressVariant, string> = {
  default: "linear-gradient(90deg, var(--neu-accent-light), var(--neu-accent))",
  success: "linear-gradient(90deg, var(--neu-success-light), var(--neu-success-dark))",
  danger: "linear-gradient(90deg, var(--neu-danger-light), var(--neu-danger-dark))",
  warning: "linear-gradient(90deg, var(--neu-warning-light), var(--neu-warning-dark))",
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = "default",
  showLabel = false,
  label,
  size = "md",
  animate = true,
  className,
  ...props
}) => {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} {...props}>
      {(label || showLabel) && (
        <div className="flex justify-between mb-2">
          {label && (
            <span className="text-xs" style={{ color: "var(--neu-text-secondary)" }}>
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--neu-text-primary)" }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn("w-full rounded-full overflow-hidden", trackHeight[size])}
        style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset-sm)" }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            animate && "neu-grow-bar"
          )}
          style={{
            width: `${pct}%`,
            background: fillColors[variant],
            boxShadow: "2px 0 8px var(--neu-accent-glow)",
          }}
        />
      </div>
    </div>
  );
};
