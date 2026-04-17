import React from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "primary" | "success" | "danger";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

const sizeMap: Record<SpinnerSize, { box: number; border: number }> = {
  sm: { box: 20, border: 2 },
  md: { box: 32, border: 3 },
  lg: { box: 48, border: 4 },
  xl: { box: 72, border: 5 },
};

const variantColor: Record<SpinnerVariant, string> = {
  default: "var(--neu-accent)",
  primary: "var(--neu-accent-dark)",
  success: "var(--neu-success)",
  danger: "var(--neu-danger)",
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
      <div
        style={{
          width: box,
          height: box,
          borderRadius: "50%",
          borderWidth: border,
          borderStyle: "solid",
          borderColor: "var(--neu-text-muted)",
          borderTopColor: color,
          animation: "spin 1s linear infinite",
          ...style,
        }}
      />
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
