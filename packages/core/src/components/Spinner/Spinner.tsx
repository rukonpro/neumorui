import React from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "primary" | "success" | "danger";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size preset of the spinner */
  size?: SpinnerSize;
  /** Color variant of the spinner arc */
  variant?: SpinnerVariant;
  /** Text displayed below the spinner */
  label?: string;
}

const sizeMap: Record<SpinnerSize, { box: number; border: number }> = {
  sm: { box: 24, border: 3 },
  md: { box: 36, border: 4 },
  lg: { box: 52, border: 5 },
  xl: { box: 76, border: 6 },
};

const variantColor: Record<SpinnerVariant, string> = {
  default: "var(--neu-accent)",
  primary: "var(--neu-accent-dark)",
  success: "var(--neu-success)",
  danger: "var(--neu-danger)",
};

const variantGlow: Record<SpinnerVariant, string> = {
  default: "var(--neu-accent-glow)",
  primary: "var(--neu-accent-glow)",
  success: "var(--neu-success-glow)",
  danger: "var(--neu-danger-glow)",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "default",
  label,
  className,
  style,
  ...props
}) => {
  const { box, border } = sizeMap[size];
  const color = variantColor[variant];
  const glow = variantGlow[variant];

  return (
    <div
      role="status"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
      {...props}
    >
      {/* Neumorphic track (recessed circle) */}
      <div
        style={{
          width: box,
          height: box,
          borderRadius: "50%",
          background: "var(--neu-bg)",
          boxShadow: `var(--neu-shadow-inset-sm)`,
          position: "relative",
          ...style,
        }}
      >
        {/* Spinning arc */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${border}px solid transparent`,
            borderTopColor: color,
            borderRightColor: color,
            filter: `drop-shadow(0 0 4px ${glow})`,
            animation: "spin 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
          }}
        />
      </div>
      {label && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--neu-text-secondary)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
Spinner.displayName = "Spinner";
