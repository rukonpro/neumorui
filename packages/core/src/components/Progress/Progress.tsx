import React from "react";

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

const fillColors: Record<ProgressVariant, string> = {
  default: "linear-gradient(90deg, #9aa2fb, #5a6cf5)",
  success: "linear-gradient(90deg, #78dbb8, #3db88a)",
  danger: "linear-gradient(90deg, #fa9080, #f5604a)",
  warning: "linear-gradient(90deg, #fad06a, #e0b030)",
};

const trackHeightMap = { sm: "6px", md: "10px", lg: "14px" };

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = "default",
  showLabel = false,
  label,
  size = "md",
  animate = true,
  className,
  style,
  ...props
}) => {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className} style={{ width: "100%", ...style }} {...props}>
      {(label || showLabel) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          {label && (
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--neu-text-secondary)",
              }}
            >
              {label}
            </span>
          )}
          {showLabel && (
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--neu-accent)",
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        style={{
          width: "100%",
          height: trackHeightMap[size],
          borderRadius: "999px",
          overflow: "hidden",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-inset-sm)",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: "999px",
            background: fillColors[variant],
            transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
            ...(animate
              ? {
                  animation: "neu-grow-bar 1.1s cubic-bezier(0.22, 1, 0.36, 1) both",
                }
              : {}),
          }}
        />
      </div>
    </div>
  );
};
