import React from "react";
import { cn } from "../../utils/cn";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

interface AlertPalette {
  bg: string;
  text: string;
}

const paletteMap: Record<AlertVariant, AlertPalette> = {
  info: { bg: "var(--neu-tint-info)", text: "var(--neu-tint-info-text)" },
  success: { bg: "var(--neu-tint-success)", text: "var(--neu-tint-success-text)" },
  warning: { bg: "var(--neu-tint-warning)", text: "var(--neu-tint-warning-text)" },
  danger: { bg: "var(--neu-tint-danger)", text: "var(--neu-tint-danger-text)" },
};

const defaultIcon: Record<AlertVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "!",
  danger: "×",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  icon,
  onClose,
  children,
  className,
  style,
  ...props
}) => {
  const { bg, text } = paletteMap[variant];
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 px-4 py-3 rounded-neu", className)}
      style={{
        background: bg,
        boxShadow: "var(--neu-shadow-raised-sm)",
        ...style,
      }}
      {...props}
    >
      <div
        className="shrink-0 text-lg leading-none flex items-center justify-center"
        style={{ color: text }}
        aria-hidden
      >
        {icon ?? defaultIcon[variant]}
      </div>
      <div className="flex-1">
        {title && (
          <p className="text-sm font-extrabold mb-0.5" style={{ color: text }}>
            {title}
          </p>
        )}
        {children && (
          <div
            className="text-xs leading-relaxed"
            style={{ color: text, opacity: 0.8 }}
          >
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center neu-transition hover:scale-110 outline-none"
          style={{ color: text, opacity: 0.6 }}
        >
          ×
        </button>
      )}
    </div>
  );
};
