import React from "react";

type InlineMessageVariant = "info" | "success" | "warning" | "danger";

interface InlineMessageProps {
  variant?: InlineMessageVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const variantConfig: Record<InlineMessageVariant, { color: string; bg: string; defaultIcon: string }> = {
  info: { color: "var(--neu-info)", bg: "rgba(91,174,224,0.08)", defaultIcon: "ℹ" },
  success: { color: "var(--neu-success)", bg: "rgba(91,191,138,0.08)", defaultIcon: "✓" },
  warning: { color: "var(--neu-warning)", bg: "rgba(232,184,75,0.08)", defaultIcon: "⚠" },
  danger: { color: "var(--neu-danger)", bg: "rgba(224,112,112,0.08)", defaultIcon: "✕" },
};

export const InlineMessage: React.FC<InlineMessageProps> = ({
  variant = "info",
  icon,
  children,
  className,
  style,
}) => {
  const vc = variantConfig[variant];

  return (
    <div
      className={className}
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        padding: "10px 14px",
        borderRadius: "12px",
        background: vc.bg,
        borderLeft: `3px solid ${vc.color}`,
        animation: "neuInlineMsgIn 0.25s ease",
        ...style,
      }}
    >
      <span
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: vc.color,
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {icon || vc.defaultIcon}
      </span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--neu-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes neuInlineMsgIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

InlineMessage.displayName = "InlineMessage";
