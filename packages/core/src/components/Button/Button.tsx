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

const sizeMap: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "8px 16px", fontSize: "12px", borderRadius: "12px" },
  md: { padding: "12px 26px", fontSize: "14px", borderRadius: "14px" },
  lg: { padding: "14px 32px", fontSize: "16px", borderRadius: "14px" },
};

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontFamily: "inherit",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  outline: "none",
  userSelect: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  raised: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-primary)",
    boxShadow: "var(--neu-shadow-raised)",
  },
  flat: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-primary)",
    boxShadow: "none",
  },
  inset: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-primary)",
    boxShadow: "var(--neu-shadow-inset)",
  },
  pill: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-secondary)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    padding: "9px 22px",
    borderRadius: "999px",
    fontSize: "13px",
  },
  icon: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-secondary)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    fontSize: "20px",
    padding: "0",
  },
  primary: {
    background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
    color: "#fff",
    boxShadow:
      "6px 6px 16px rgba(108,126,248,.45), -4px -4px 12px var(--neu-shadow-light)",
  },
  danger: {
    background: "linear-gradient(145deg, #fa9080, #f5604a)",
    color: "#fff",
    boxShadow:
      "6px 6px 16px rgba(248,124,108,.45), -4px -4px 12px var(--neu-shadow-light)",
  },
  success: {
    background: "linear-gradient(145deg, #78dbb8, #3db88a)",
    color: "#fff",
    boxShadow:
      "6px 6px 16px rgba(94,203,161,.45), -4px -4px 12px var(--neu-shadow-light)",
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
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const { createRipple } = useRipple();
    const [hovered, setHovered] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);

    const computedStyle: React.CSSProperties = {
      ...baseStyle,
      ...sizeMap[size],
      ...variantStyles[variant],
    };

    if (variant === "pill" || variant === "icon") {
      delete computedStyle.padding;
      Object.assign(computedStyle, variantStyles[variant]);
    }

    if (hovered && !disabled && !pressed) {
      if (variant === "raised") {
        computedStyle.transform = "translateY(-3px)";
        computedStyle.boxShadow = "var(--neu-shadow-raised-lg)";
      } else if (variant === "pill") {
        computedStyle.color = "var(--neu-accent)";
        computedStyle.transform = "translateY(-2px)";
      } else if (variant === "icon") {
        computedStyle.color = "var(--neu-accent)";
        computedStyle.transform = "translateY(-2px)";
        computedStyle.boxShadow = "var(--neu-shadow-raised)";
      } else if (variant === "flat") {
        computedStyle.boxShadow = "var(--neu-shadow-raised-sm)";
      } else if (
        variant === "primary" ||
        variant === "danger" ||
        variant === "success"
      ) {
        computedStyle.transform = "translateY(-3px)";
      }
    }

    if (pressed && !disabled) {
      if (variant === "raised") {
        computedStyle.boxShadow = "var(--neu-shadow-inset)";
        computedStyle.transform = "translateY(0) scale(0.97)";
      } else if (variant === "pill" || variant === "icon") {
        computedStyle.boxShadow = "var(--neu-shadow-inset-sm)";
        computedStyle.transform = "scale(0.97)";
      } else if (
        variant === "primary" ||
        variant === "danger" ||
        variant === "success"
      ) {
        computedStyle.transform = "scale(0.97)";
      }
    }

    if (disabled || loading) {
      computedStyle.opacity = 0.5;
      computedStyle.cursor = "not-allowed";
      computedStyle.transform = "none";
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={(e) => {
          if (ripple) createRipple(e);
          onClick?.(e);
        }}
        onMouseEnter={(e) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          setPressed(false);
          onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          setPressed(true);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setPressed(false);
          onMouseUp?.(e);
        }}
        className={className}
        style={{ ...computedStyle, ...style }}
        {...props}
      >
        {loading ? (
          <span
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
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
