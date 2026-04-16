import React from "react";
import { cn } from "../../utils/cn";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const accentMap: Record<AlertVariant, string> = {
  info: "var(--neu-info)",
  success: "var(--neu-success)",
  warning: "var(--neu-warning)",
  danger: "var(--neu-danger)",
};

const defaultIcon: Record<AlertVariant, string> = {
  info: "i",
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
  const accent = accentMap[variant];
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 p-4 rounded-neu-lg", className)}
      style={{
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
        borderLeft: `3px solid ${accent}`,
        ...style,
      }}
      {...props}
    >
      <div
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: accent }}
      >
        {icon ?? defaultIcon[variant]}
      </div>
      <div className="flex-1">
        {title && (
          <p
            className="text-sm font-semibold mb-0.5"
            style={{ color: "var(--neu-text-primary)" }}
          >
            {title}
          </p>
        )}
        {children && (
          <div className="text-sm" style={{ color: "var(--neu-text-secondary)" }}>
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center neu-transition hover:scale-110 outline-none"
          style={{ color: "var(--neu-text-muted)" }}
        >
          ×
        </button>
      )}
    </div>
  );
};
