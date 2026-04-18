import React from "react";

export interface AreaChartDataItem {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: AreaChartDataItem[];
  height?: number;
  color?: string;
  gradientOpacity?: number;
  showDots?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 160,
  color = "#6c7ef8",
  gradientOpacity = 0.35,
  showDots = true,
  showGrid = true,
  showLabels = true,
  showValues = false,
  animate = true,
  className,
  style,
}) => {
  const padding = { top: 16, right: 20, bottom: 8, left: 20 };
  const svgWidth = 500;
  const svgHeight = height;
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  if (data.length === 0) return null;

  const minVal = Math.min(...data.map((d) => d.value)) * 0.9;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.05;
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - ((d.value - minVal) / range) * chartH,
  }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    linePath += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const fillPath =
    linePath +
    ` L ${points[points.length - 1].x} ${svgHeight - padding.bottom} L ${points[0].x} ${svgHeight - padding.bottom} Z`;

  const gradId = React.useId();
  const gridLines = 4;

  return (
    <div className={className} style={style}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: `${svgHeight}px`, display: "block" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={gradientOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Grid */}
        {showGrid &&
          Array.from({ length: gridLines }).map((_, i) => {
            const y = padding.top + (chartH / gridLines) * i;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={svgWidth - padding.right}
                y2={y}
                stroke="var(--neu-text-muted)"
                strokeOpacity="0.12"
                strokeDasharray="4 4"
              />
            );
          })}

        {/* Fill area */}
        <path
          d={fillPath}
          fill={`url(#${gradId})`}
          style={animate ? { opacity: 0, animation: "neuAreaIn 0.8s ease 0.3s forwards" } : undefined}
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2000"
          style={animate ? { animation: "neuAreaDraw 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards" } : undefined}
        />

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={4}
                fill="var(--neu-bg)"
                stroke={color}
                strokeWidth="2.5"
                style={animate ? { opacity: 0, animation: `neuAreaIn 0.3s ease ${0.1 * i + 0.5}s forwards` } : undefined}
              />
              {showValues && (
                <text
                  x={p.x}
                  y={p.y - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill="var(--neu-text-secondary)"
                  style={animate ? { opacity: 0, animation: `neuAreaIn 0.3s ease ${0.1 * i + 0.6}s forwards` } : undefined}
                >
                  {data[i].value}
                </text>
              )}
            </g>
          ))}
      </svg>

      {/* Labels */}
      {showLabels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", padding: `0 ${padding.left}px` }}>
          {data.map((d, i) => (
            <span key={i} style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
              {d.label}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes neuAreaIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuAreaDraw { from { stroke-dashoffset: 2000; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
};

AreaChart.displayName = "AreaChart";
