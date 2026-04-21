import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction of the divider */
  orientation?: "horizontal" | "vertical";
  /** Text label displayed in the center */
  label?: string;
  /** Visual style variant */
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
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={{
          width: "1px",
          alignSelf: "stretch",
          background: "var(--neu-text-muted)",
          opacity: 0.2,
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
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          margin: "8px 0",
          ...style,
        }}
        {...props}
      >
        <div style={{ flex: 1, height: "1px", background: "var(--neu-text-muted)", opacity: 0.2 }} />
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.12em",
            color: "var(--neu-text-muted)",
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--neu-text-muted)", opacity: 0.2 }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={{
        height: "1px",
        width: "100%",
        background: "var(--neu-text-muted)",
        opacity: 0.2,
        ...style,
      }}
      {...props}
    />
  );
};
Divider.displayName = "Divider";
