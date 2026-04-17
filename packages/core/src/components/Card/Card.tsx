import React from "react";
import { cn } from "../../utils/cn";

type CardVariant = "raised" | "inset" | "flat";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-[1.75rem]",
  lg: "p-6 md:p-7",
};

const variantStyle: Record<CardVariant, React.CSSProperties> = {
  raised: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-lg)",
    borderRadius: "var(--neu-radius-xl)",
  },
  inset: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-inset)",
    borderRadius: "var(--neu-radius-xl)",
  },
  flat: {
    background: "var(--neu-bg)",
    borderRadius: "var(--neu-radius-xl)",
  },
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "raised", padding = "md", className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(paddingClasses[padding], className)}
        style={{ ...variantStyle[variant], ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
