import React from "react";

export interface RadarChartDataItem {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: RadarChartDataItem[];
  size?: number;
  color?: string;
  maxValue?: number;
  showLabels?: boolean;
  showValues?: boolean;
  rings?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 240,
  color = "#6c7ef8",
  maxValue = 100,
  showLabels = true,
  showValues = false,
  rings = 4,
  animate = true,
  className,
  style,
}) => {
  if (data.length < 3) return null;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 36;
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const ringPaths = Array.from({ length: rings }).map((_, ringIdx) => {
    const r = ((ringIdx + 1) / rings) * radius;
    return data
      .map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z";
  });

  const dataPoints = data.map((d, i) => getPoint(i, d.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const gradId = React.useId();

  return (
    <div className={className} style={{ display: "inline-flex", justifyContent: "center", ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Rings */}
        {ringPaths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--neu-text-muted)" strokeOpacity="0.15" strokeWidth="1" />
        ))}

        {/* Axes */}
        {data.map((_, i) => {
          const p = getPoint(i, maxValue);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--neu-text-muted)" strokeOpacity="0.12" strokeWidth="1" />;
        })}

        {/* Data fill */}
        <path
          d={dataPath}
          fill={`url(#${gradId})`}
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          style={animate ? { opacity: 0, transform: "scale(0.8)", transformOrigin: "center", animation: "neuRadarIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards" } : undefined}
        />

        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--neu-bg)"
            stroke={color}
            strokeWidth="2.5"
            style={animate ? { opacity: 0, animation: `neuRadarDotIn 0.3s ease ${0.1 * i + 0.5}s forwards` } : undefined}
          />
        ))}

        {/* Labels */}
        {showLabels &&
          data.map((d, i) => {
            const p = getPoint(i, maxValue + 18);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="700"
                fill="var(--neu-text-secondary)"
              >
                {d.label}
              </text>
            );
          })}

        {/* Values */}
        {showValues &&
          dataPoints.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fill={color}
            >
              {data[i].value}
            </text>
          ))}
      </svg>
      <style>{`
        @keyframes neuRadarIn { to { opacity: 1; transform: scale(1); } }
        @keyframes neuRadarDotIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

RadarChart.displayName = "RadarChart";
