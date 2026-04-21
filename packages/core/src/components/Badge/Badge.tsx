import React from "react";

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
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "11px",
        fontWeight: 800,
        padding: "4px 13px",
        borderRadius: "999px",
        transition:
          "transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.2s ease",
        transform: hovered ? "translateY(-1px)" : undefined,
        ...variantStyle[variant],
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "currentColor",
          }}
        />
      )}
      {children}
    </span>
  );
};
Badge.displayName = "Badge";
