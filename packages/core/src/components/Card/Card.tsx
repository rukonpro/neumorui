import React from "react";

type CardVariant = "raised" | "inset" | "flat";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
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
    return (
      <div
        ref={ref}
        className={className}
        style={{
          background: "var(--neu-bg)",
          borderRadius: "24px",
          padding: paddingMap[padding],
          boxShadow: variantShadow[variant],
          transition: "background 0.35s ease, box-shadow 0.35s ease",
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
