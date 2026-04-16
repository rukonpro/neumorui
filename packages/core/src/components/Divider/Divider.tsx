import React from "react";
import { cn } from "../../utils/cn";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  variant?: "solid" | "inset";
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  label,
  variant = "inset",
  className,
  style,
  ...props
}) => {
  const isVertical = orientation === "vertical";

  if (isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch", className)}
        style={{
          background:
            variant === "solid"
              ? "var(--neu-border)"
              : "linear-gradient(180deg, transparent, var(--neu-shadow-dark), transparent)",
          boxShadow:
            variant === "inset"
              ? "1px 0 0 var(--neu-shadow-light)"
              : undefined,
          ...style,
        }}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-3 w-full my-2", className)}
        {...props}
      >
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--neu-shadow-dark), transparent)",
          }}
        />
        <span
          className="text-xs uppercase tracking-widest font-semibold"
          style={{ color: "var(--neu-text-muted)" }}
        >
          {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--neu-shadow-dark), transparent)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full", className)}
      style={{
        background:
          variant === "solid"
            ? "var(--neu-border)"
            : "linear-gradient(90deg, transparent, var(--neu-shadow-dark), transparent)",
        boxShadow:
          variant === "inset" ? "0 1px 0 var(--neu-shadow-light)" : undefined,
        ...style,
      }}
      {...props}
    />
  );
};
