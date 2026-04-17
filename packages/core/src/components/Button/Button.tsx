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
  sm: "px-4 py-2 text-xs rounded-[12px]",
  md: "px-[26px] py-3 text-sm rounded-neu",
  lg: "px-8 py-[14px] text-base rounded-neu",
};

const variantClasses: Record<ButtonVariant, string> = {
  raised:
    "neu-raised neu-transition hover:-translate-y-0.5 hover:shadow-neu-raised-lg active:shadow-neu-inset active:scale-[.97]",
  flat: "neu-flat neu-transition hover:shadow-neu-raised-sm",
  inset: "neu-inset neu-transition",
  pill: "neu-raised-sm neu-transition rounded-full hover:-translate-y-0.5 active:shadow-neu-inset-sm active:scale-[.97]",
  icon: "neu-raised-sm neu-transition hover:-translate-y-0.5 active:shadow-neu-inset-sm rounded-neu aspect-square !px-0 active:scale-[.97]",
  primary: "neu-transition hover:-translate-y-0.5 active:scale-[.97] text-white",
  danger: "neu-transition hover:-translate-y-0.5 active:scale-[.97] text-white",
  success: "neu-transition hover:-translate-y-0.5 active:scale-[.97] text-white",
};

const variantStyle: Partial<Record<ButtonVariant, React.CSSProperties>> = {
  primary: {
    background: "var(--neu-gradient-primary)",
    boxShadow: "6px 6px 16px var(--neu-accent-glow), -4px -4px 12px var(--neu-shadow-light)",
  },
  danger: {
    background: "var(--neu-gradient-danger)",
    boxShadow: "6px 6px 16px var(--neu-danger-glow), -4px -4px 12px var(--neu-shadow-light)",
  },
  success: {
    background: "var(--neu-gradient-success)",
    boxShadow: "6px 6px 16px var(--neu-success-glow), -4px -4px 12px var(--neu-shadow-light)",
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
          "relative overflow-hidden inline-flex items-center justify-center gap-2 font-bold cursor-pointer select-none",
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
