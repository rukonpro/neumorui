import React from "react";

interface SparklineProps {
  /** Numeric data points to plot */
  data: number[];
  /** SVG width in pixels */
  width?: number;
  /** SVG height in pixels */
  height?: number;
  /** Line and fill color */
  color?: string;
  /** Show gradient fill below line */
  showFill?: boolean;
  /** Thickness of the line stroke */
  strokeWidth?: number;
  /** Enable draw animation */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 32,
  color = "#6c7ef8",
  showFill = true,
  strokeWidth = 1.5,
  animate = true,
  className,
  style,
}) => {
  if (data.length < 2) return null;

  const pad = 2;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (height - pad * 2) - ((v - minVal) / range) * (height - pad * 2),
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
    ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const gradId = React.useId();

  // Determine trend color
  const trending = data[data.length - 1] >= data[0];
  const autoColor = color || (trending ? "var(--neu-success)" : "var(--neu-danger)");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={autoColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={autoColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showFill && (
        <path
          d={fillPath}
          fill={`url(#${gradId})`}
          style={animate ? { opacity: 0, animation: "neuSparkIn 0.6s ease 0.3s forwards" } : undefined}
        />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={autoColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="1000"
        style={animate ? { animation: "neuSparkDraw 0.8s ease forwards" } : undefined}
      />
      {/* End dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2.5}
        fill={autoColor}
        style={animate ? { opacity: 0, animation: "neuSparkIn 0.3s ease 0.6s forwards" } : undefined}
      />
      <style>{`
        @keyframes neuSparkIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuSparkDraw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
};

Sparkline.displayName = "Sparkline";
