import React from "react";

interface AnnouncementBarProps {
  children: React.ReactNode;
  variant?: "gradient" | "clay";
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  children,
  variant = "clay",
  icon,
  dismissible = false,
  onDismiss,
  className,
  style,
  ...rest
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const isGradient = variant === "gradient";

  const containerStyle: React.CSSProperties = {
    padding: "12px 18px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    ...(isGradient
      ? {
          background: "linear-gradient(135deg, #8490fa, #5a6cf5)",
          color: "#fff",
        }
      : {
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-primary)",
        }),
    animation: "neu-slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
    ...style,
  };

  const closeBtnStyle: React.CSSProperties = {
    width: "26px",
    height: "26px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 700,
    flexShrink: 0,
    transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
    ...(isGradient
      ? { background: "rgba(255,255,255,.2)", color: "#fff" }
      : { background: "none", color: "var(--neu-text-muted)" }),
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={className} style={containerStyle} role="alert" {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        {icon && <span style={{ fontSize: "18px", flexShrink: 0 }}>{icon}</span>}
        <span style={{ fontSize: "13px", fontWeight: 700 }}>{children}</span>
      </div>
      {dismissible && (
        <button
          aria-label="Dismiss"
          onClick={handleDismiss}
          style={closeBtnStyle}
        >
          &#10005;
        </button>
      )}
    </div>
  );
};

AnnouncementBar.displayName = "AnnouncementBar";
