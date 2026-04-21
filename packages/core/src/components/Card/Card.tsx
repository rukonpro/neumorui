import React from "react";

type CardVariant = "raised" | "inset" | "flat";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant of the card */
  variant?: CardVariant;
  /** Inner padding preset */
  padding?: "sm" | "md" | "lg";
}

const paddingMap = { sm: "1rem", md: "1.75rem", lg: "2rem" };

const variantShadow: Record<CardVariant, string> = {
  raised: "var(--neu-shadow-raised-lg)",
  inset: "var(--neu-shadow-inset)",
  flat: "none",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "raised", padding = "md", className, style, children, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    const hoverStyle: React.CSSProperties =
      hovered && variant === "raised"
        ? {
            transform: "translateY(-5px)",
            boxShadow:
              "16px 16px 36px var(--neu-shadow-dark), -10px -10px 26px var(--neu-shadow-light)",
          }
        : {};

    return (
      <div
        ref={ref}
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--neu-bg)",
          color: "var(--neu-text-primary)",
          borderRadius: "24px",
          padding: paddingMap[padding],
          boxShadow: variantShadow[variant],
          transition:
            "transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.25s ease, background 0.35s ease, color 0.35s ease",
          ...hoverStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
