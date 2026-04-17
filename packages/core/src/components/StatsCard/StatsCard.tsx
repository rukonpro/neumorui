import React from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  color?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

const containerStyle: React.CSSProperties = {
  padding: "14px",
  borderRadius: "16px",
  boxShadow: "var(--neu-shadow-raised)",
  background: "var(--neu-bg)",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--neu-text-secondary)",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: "6px",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--neu-text-secondary)",
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  trend,
  color,
  description,
  className,
  style,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);

  const valueStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    color: color || "var(--neu-accent)",
    lineHeight: 1.1,
  };

  const trendStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 700,
    marginTop: "4px",
    color:
      trend?.direction === "up" ? "var(--neu-success)" : "var(--neu-danger)",
  };

  return (
    <div
      className={className}
      style={{
        ...containerStyle,
        transform: hovered ? "translateY(-3px)" : undefined,
        boxShadow: hovered ? "var(--neu-shadow-raised-lg)" : containerStyle.boxShadow,
        ...style,
      }}
      data-testid="stats-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
      {trend && (
        <div style={trendStyle}>
          {trend.direction === "up" ? "↑" : "↓"} {trend.value}
        </div>
      )}
      {description && <div style={descriptionStyle}>{description}</div>}
    </div>
  );
};

StatsCard.displayName = "StatsCard";
