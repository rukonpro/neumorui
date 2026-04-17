import React from "react";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const paletteMap: Record<AlertVariant, { bg: string; text: string }> = {
  info: { bg: "var(--neu-tint-info)", text: "var(--neu-tint-info-text)" },
  success: { bg: "var(--neu-tint-success)", text: "var(--neu-tint-success-text)" },
  warning: { bg: "var(--neu-tint-warning)", text: "var(--neu-tint-warning-text)" },
  danger: { bg: "var(--neu-tint-danger)", text: "var(--neu-tint-danger-text)" },
};

const defaultIcon: Record<AlertVariant, string> = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  danger: "🚨",
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
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "14px",
        boxShadow: "var(--neu-shadow-raised-sm)",
        background: bg,
        ...style,
      }}
      {...props}
    >
      <span style={{ fontSize: "18px", flexShrink: 0 }} aria-hidden>
        {icon ?? defaultIcon[variant]}
      </span>
      <div style={{ flex: 1 }}>
        {title && (
          <p style={{ fontSize: "13px", fontWeight: 800, color: text, margin: 0 }}>
            {title}
          </p>
        )}
        {children && (
          <div
            style={{
              fontSize: "12px",
              color: text,
              opacity: 0.8,
              marginTop: title ? "3px" : 0,
              lineHeight: 1.5,
            }}
          >
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: text,
            opacity: 0.6,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
