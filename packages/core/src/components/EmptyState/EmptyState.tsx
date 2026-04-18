import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<string, { iconBox: number; titleSize: string; descSize: string; padding: string }> = {
  sm: { iconBox: 48, titleSize: "16px", descSize: "12px", padding: "24px" },
  md: { iconBox: 64, titleSize: "20px", descSize: "14px", padding: "40px" },
  lg: { iconBox: 80, titleSize: "24px", descSize: "15px", padding: "56px" },
};

const DefaultIcon = ({ size }: { size: number }) => (
  <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
  style,
}) => {
  const { iconBox, titleSize, descSize, padding } = sizeMap[size];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding,
        borderRadius: "20px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset-sm)",
        ...style,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: iconBox,
          height: iconBox,
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-muted)",
          marginBottom: "20px",
          fontSize: `${iconBox * 0.4}px`,
        }}
      >
        {icon || <DefaultIcon size={iconBox} />}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: titleSize,
          fontWeight: 800,
          color: "var(--neu-text-primary)",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: descSize,
            color: "var(--neu-text-secondary)",
            margin: "0 0 20px",
            maxWidth: "320px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
};

EmptyState.displayName = "EmptyState";
