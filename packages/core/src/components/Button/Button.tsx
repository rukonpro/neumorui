import React from "react";
import { cn } from "../../utils/cn";
import { useRipple } from "../../hooks/useAnimation";

type ButtonVariant =
  | "raised"
  | "flat"
  | "inset"
  | "pill"
  | "icon"
  | "primary"
  | "danger"
  | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-[10px]",
  md: "px-6 py-3 text-sm rounded-neu",
  lg: "px-8 py-4 text-base rounded-neu-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  raised:
    "neu-raised neu-transition hover:-translate-y-0.5 active:shadow-neu-inset active:translate-y-0",
  flat: "neu-flat border border-[var(--neu-border)] neu-transition hover:shadow-neu-raised-sm",
  inset: "neu-inset neu-transition",
  pill: "neu-raised-sm neu-transition rounded-full hover:-translate-y-0.5 active:shadow-neu-inset",
  icon: "neu-raised-sm neu-transition hover:-translate-y-0.5 active:shadow-neu-inset rounded-neu aspect-square !px-0",
  primary: "neu-transition hover:-translate-y-0.5 active:translate-y-0 text-white",
  danger: "neu-transition hover:-translate-y-0.5 active:translate-y-0 text-white",
  success: "neu-transition hover:-translate-y-0.5 active:translate-y-0 text-white",
};

const variantStyle: Partial<Record<ButtonVariant, React.CSSProperties>> = {
  primary: {
    background: "var(--neu-gradient-primary)",
    boxShadow: "5px 5px 12px var(--neu-accent-glow), -3px -3px 8px var(--neu-shadow-light)",
  },
  danger: {
    background: "var(--neu-gradient-danger)",
    boxShadow: "5px 5px 12px var(--neu-danger-glow), -3px -3px 8px var(--neu-shadow-light)",
  },
  success: {
    background: "var(--neu-gradient-success)",
    boxShadow: "5px 5px 12px var(--neu-success-glow), -3px -3px 8px var(--neu-shadow-light)",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "raised",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className,
      style,
      ripple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const { createRipple } = useRipple();
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={(e) => {
          if (ripple) createRipple(e);
          onClick?.(e);
        }}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        style={{ ...variantStyle[variant], ...style }}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
