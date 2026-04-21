import React, { useState } from "react";

export type NotificationVariant = "default" | "success" | "warning" | "danger" | "info";

export interface NotificationCardProps {
  /** Icon displayed beside the title */
  icon?: React.ReactNode;
  /** Notification heading text */
  title: string;
  /** Supporting detail text */
  description?: string;
  /** Timestamp display string */
  time?: string;
  /** Color variant for the notification */
  variant?: NotificationVariant;
  /** Show unread indicator */
  unread?: boolean;
  /** Action element below description */
  action?: React.ReactNode;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Card click handler */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

const variantColors: Record<NotificationVariant, string> = {
  default: "var(--neu-accent)",
  success: "var(--neu-success)",
  warning: "var(--neu-warning)",
  danger: "var(--neu-danger)",
  info: "var(--neu-info)",
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  title,
  description,
  time,
  variant = "default",
  unread = false,
  action,
  onDismiss,
  onClick,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);
  const accentColor = variantColors[variant];

  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "16px",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-raised)" : "var(--neu-shadow-raised-sm)",
        borderLeft: unread ? `3px solid ${accentColor}` : "3px solid transparent",
        cursor: onClick ? "pointer" : "default",
        transform: hovered ? "translateY(-2px)" : "none",
        transition,
        ...style,
      }}
    >
      {/* Icon */}
      {icon && (
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "16px",
            background: `${accentColor}18`,
            color: accentColor,
            boxShadow: "var(--neu-shadow-inset-sm)",
          }}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
            {title}
          </span>
          {unread && (
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: accentColor,
                flexShrink: 0,
              }}
            />
          )}
        </div>
        {description && (
          <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--neu-text-secondary)", margin: "3px 0 0", lineHeight: 1.5 }}>
            {description}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
          {time && (
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
              {time}
            </span>
          )}
          {action}
        </div>
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
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
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--neu-text-muted)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            transition,
            flexShrink: 0,
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
};

NotificationCard.displayName = "NotificationCard";
