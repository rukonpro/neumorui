import React from "react";

interface GaugeChartProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  suffix?: string;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  max = 100,
  size = 160,
  strokeWidth = 14,
  color,
  label,
  showValue = true,
  suffix = "",
  animate = true,
  className,
  style,
}) => {
  const pct = Math.min(Math.max(value / max, 0), 1);

  // Auto color if not provided
  const fillColor = color || (pct > 0.7 ? "var(--neu-success)" : pct > 0.4 ? "var(--neu-warning)" : "var(--neu-danger)");

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2 - 4;

  // 270 degree arc (from 135° to 405°, or -225° to 45°)
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle; // 270

  const polarToCartesian = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (start: number, end: number) => {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const bgPath = describeArc(startAngle, endAngle);
  const valuePath = describeArc(startAngle, startAngle + totalAngle * pct);
  const circumference = (totalAngle / 360) * 2 * Math.PI * r;

  return (
    <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="var(--neu-text-muted)"
          strokeOpacity="0.15"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value arc */}
        <path
          d={valuePath}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={
            animate
              ? { strokeDashoffset: circumference, animation: `neuGaugeFill 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards` }
              : { strokeDashoffset: 0 }
          }
        />

        {/* Center text */}
        {showValue && (
          <>
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.18}
              fontWeight="800"
              fill="var(--neu-text-primary)"
              style={animate ? { opacity: 0, animation: "neuGaugeText 0.4s ease 0.8s forwards" } : undefined}
            >
              {Math.round(value)}{suffix}
            </text>
            {label && (
              <text
                x={cx}
                y={cy + size * 0.12}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--neu-text-muted)"
                style={animate ? { opacity: 0, animation: "neuGaugeText 0.4s ease 1s forwards" } : undefined}
              >
                {label}
              </text>
            )}
          </>
        )}
      </svg>
      <style>{`
        @keyframes neuGaugeFill { to { stroke-dashoffset: 0; } }
        @keyframes neuGaugeText { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

GaugeChart.displayName = "GaugeChart";
