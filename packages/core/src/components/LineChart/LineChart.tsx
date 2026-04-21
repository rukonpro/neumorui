import React from "react";

export interface LineChartDataItem {
  label: string;
  value: number;
}

interface LineChartProps {
  /** Array of data points for the line */
  data: LineChartDataItem[];
  /** Chart height in pixels */
  height?: number;
  /** Line and fill color */
  color?: string;
  /** Show dots at each data point */
  showDots?: boolean;
  /** Show gradient fill under the line */
  showFill?: boolean;
  /** Enable draw-in animation */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 140,
  color = "#6c7ef8",
  showDots = true,
  showFill = true,
  animate = true,
  className,
  style,
  ...rest
}) => {
  const padding = 20;
  const svgWidth = 500;
  const svgHeight = height;

  if (data.length === 0) return null;

  const minVal = Math.min(...data.map((d) => d.value));
  const maxVal = Math.max(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (svgWidth - padding * 2),
    y: svgHeight - padding - ((d.value - minVal) / range) * (svgHeight - padding * 2),
  }));

  // Build bezier path
  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    linePath += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const fillPath =
    linePath +
    ` L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  const gradientId = React.useId();

  return (
    <div className={className} style={style} {...rest}>
      <svg
        data-testid="line-chart-svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: "100%", height: `${svgHeight}px`, display: "block" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showFill && (
          <path
            d={fillPath}
            fill={`url(#${gradientId})`}
            style={
              animate
                ? { opacity: 0, animation: "neuLineIn 0.8s ease forwards" }
                : undefined
            }
          />
        )}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="2000"
          style={
            animate
              ? { animation: "neuLineDraw 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards" }
              : undefined
          }
        />
        {showDots &&
          points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill={color}
              data-testid={`dot-${i}`}
              style={
                animate
                  ? {
                      opacity: 0,
                      animation: `neuLineIn 0.4s ease ${0.1 * i}s forwards`,
                    }
                  : undefined
              }
            />
          ))}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        {data.map((d, i) => (
          <span
            key={i}
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--neu-text-muted)",
            }}
          >
            {d.label}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes neuLineIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuLineDraw { from { stroke-dashoffset: 2000; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
};

LineChart.displayName = "LineChart";
