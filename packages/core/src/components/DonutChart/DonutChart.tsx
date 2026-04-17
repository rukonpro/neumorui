import React from "react";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  size = 120,
  strokeWidth = 18,
  centerLabel,
  centerValue,
  className,
  style,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let cumulativeOffset = 0;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(176,184,216,.2)"
            strokeWidth={strokeWidth}
          />
          {/* Segments */}
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dashLen = pct * circumference;
            const gapLen = circumference - dashLen;
            const offset = -cumulativeOffset * circumference + circumference * 0.25;
            cumulativeOffset += pct;

            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLen} ${gapLen}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)",
                }}
              />
            );
          })}
        </svg>
        {/* Center text */}
        {(centerValue || centerLabel) && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {centerValue && (
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "18px",
                  color: "var(--neu-text-primary)",
                  lineHeight: 1,
                }}
              >
                {centerValue}
              </div>
            )}
            {centerLabel && (
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "var(--neu-text-muted)",
                  marginTop: "2px",
                }}
              >
                {centerLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {segments.map((seg, i) => {
          const pct = Math.round((seg.value / total) * 100);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  background: seg.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--neu-text-primary)",
                  }}
                >
                  {seg.label}
                </span>
                <div
                  style={{
                    height: "4px",
                    borderRadius: "999px",
                    background: "rgba(176,184,216,.15)",
                    overflow: "hidden",
                    width: "60px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "999px",
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${seg.color}, ${seg.color}cc)`,
                    }}
                  />
                </div>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--neu-text-primary)",
                }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DonutChart.displayName = "DonutChart";
