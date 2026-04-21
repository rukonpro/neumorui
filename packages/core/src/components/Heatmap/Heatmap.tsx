import React from "react";

interface HeatmapProps {
  /** Grid values as flat or 2D array */
  data: number[][] | number[];
  /** Number of columns in the grid */
  cols?: number;
  /** Number of rows in the grid */
  rows?: number;
  /** RGB color string for cell fills */
  colors?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "transform 0.15s";

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  cols = 13,
  rows = 7,
  colors = "108, 126, 248",
  className,
  style,
  ...rest
}) => {
  const flat: number[] = Array.isArray(data[0])
    ? (data as number[][]).flat()
    : (data as number[]);

  const total = cols * rows;
  const cells = flat.length >= total ? flat.slice(0, total) : [
    ...flat,
    ...Array(total - flat.length).fill(0),
  ];

  const colorBase = colors.startsWith("var(") ? undefined : colors;

  const getOpacity = (v: number) => {
    if (v < 0.1) return 0.05;
    if (v < 0.4) return 0.2;
    if (v < 0.7) return 0.5;
    return 0.9;
  };

  return (
    <div className={className} style={style} {...rest}>
      <div
        data-testid="heatmap-grid"
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        {cells.map((v, i) => {
          const op = getOpacity(v);
          const isLow = v < 0.1;
          return (
            <div
              key={i}
              data-testid={`heatmap-cell-${i}`}
              title={`${Math.round(v * 20)} contributions`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                cursor: "pointer",
                transition,
                animation: `neu-cell-fade 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${(i % cols) * 0.015 + Math.floor(i / cols) * 0.02}s both`,
                boxShadow: isLow ? "var(--neu-shadow-inset-sm)" : "none",
                background: colorBase
                  ? `rgba(${colorBase}, ${op})`
                  : `var(--neu-accent)`,
                opacity: colorBase ? undefined : op,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "scale(1.3)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "";
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "6px",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
          Less
        </span>
        {[0.1, 0.3, 0.6, 0.9].map((op, i) => (
          <div
            key={i}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              background: colorBase
                ? `rgba(${colorBase}, ${op})`
                : "var(--neu-accent)",
              opacity: colorBase ? undefined : op,
              boxShadow: i === 0 ? "var(--neu-shadow-inset-sm)" : "none",
            }}
          />
        ))}
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
          More
        </span>
      </div>
    </div>
  );
};

Heatmap.displayName = "Heatmap";
