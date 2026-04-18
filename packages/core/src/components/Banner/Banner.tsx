import React, { useState } from "react";

type BannerVariant = "default" | "info" | "success" | "warning" | "danger";
type BannerPosition = "top" | "bottom";

interface BannerProps {
  children: React.ReactNode;
  variant?: BannerVariant;
  position?: BannerPosition;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  sticky?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

const variantStyles: Record<BannerVariant, { bg: string; border: string; color: string }> = {
  default: { bg: "var(--neu-bg)", border: "var(--neu-accent)", color: "var(--neu-text-primary)" },
  info: { bg: "var(--neu-bg)", border: "var(--neu-info)", color: "var(--neu-text-primary)" },
  success: { bg: "var(--neu-bg)", border: "var(--neu-success)", color: "var(--neu-text-primary)" },
  warning: { bg: "var(--neu-bg)", border: "var(--neu-warning)", color: "var(--neu-text-primary)" },
  danger: { bg: "var(--neu-bg)", border: "var(--neu-danger)", color: "var(--neu-text-primary)" },
};

export const Banner: React.FC<BannerProps> = ({
  children,
  variant = "default",
  position = "top",
  icon,
  action,
  dismissible = true,
  onDismiss,
  sticky = false,
  className,
  style,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const vs = variantStyles[variant];

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={className}
      role="banner"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 20px",
        background: vs.bg,
        boxShadow: "var(--neu-shadow-raised-sm)",
        borderBottom: position === "top" ? `2px solid ${vs.border}` : undefined,
        borderTop: position === "bottom" ? `2px solid ${vs.border}` : undefined,
        ...(sticky
          ? { position: "sticky", [position]: 0, zIndex: 40 }
          : {}),
        animation: position === "top" ? "neuBannerDown 0.3s ease" : "neuBannerUp 0.3s ease",
        ...style,
      }}
    >
      {icon && (
        <span style={{ fontSize: "18px", flexShrink: 0, color: vs.border }}>
          {icon}
        </span>
      )}

      <span
        style={{
          flex: 1,
          fontSize: "13px",
          fontWeight: 600,
          color: vs.color,
          lineHeight: 1.5,
        }}
      >
        {children}
      </span>

      {action && <div style={{ flexShrink: 0 }}>{action}</div>}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--neu-text-muted)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            transition,
            flexShrink: 0,
          }}
          aria-label="Dismiss banner"
        >
          ×
        </button>
      )}

      <style>{`
        @keyframes neuBannerDown { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes neuBannerUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

Banner.displayName = "Banner";
