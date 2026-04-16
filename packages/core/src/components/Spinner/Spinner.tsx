import React from "react";
import { cn } from "../../utils/cn";

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
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <div
        className="rounded-full animate-spin"
        style={{
          width: box,
          height: box,
          borderWidth: border,
          borderStyle: "solid",
          borderColor: `${color} transparent transparent transparent`,
          boxShadow: "var(--neu-shadow-inset-sm)",
          ...style,
        }}
      />
      {label && (
        <span
          className="text-xs font-medium"
          style={{ color: "var(--neu-text-secondary)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
