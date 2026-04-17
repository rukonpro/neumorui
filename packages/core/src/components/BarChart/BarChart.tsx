import React from "react";

export interface BarChartDataItem {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartDataItem[];
  height?: number;
  title?: string;
  trend?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const defaultGradient = "linear-gradient(180deg, #9aa2fb, #5a6cf5)";

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 120,
  title,
  trend,
  className,
  style,
  ...rest
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  return (
    <div className={className} style={style} {...rest}>
      {(title || trend) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          {title && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "var(--neu-text-primary)",
              }}
            >
              {title}
            </span>
          )}
          {trend && <span>{trend}</span>}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: `${height}px`,
          gap: "0",
        }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                data-testid={`bar-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: "60%",
                  height: `${barHeight}%`,
                  borderRadius: "6px 6px 0 0",
                  background: item.color || defaultGradient,
                  boxShadow: isHovered
                    ? "var(--neu-shadow-raised)"
                    : "var(--neu-shadow-raised-sm)",
                  transition:
                    "all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)",
                  filter: isHovered ? "brightness(1.1)" : undefined,
                  transform: mounted
                    ? isHovered
                      ? "scaleY(1.05)"
                      : "scaleY(1)"
                    : "scaleY(0)",
                  transformOrigin: "bottom",
                  animation: mounted
                    ? `neu-bar-grow 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.06}s both`
                    : undefined,
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--neu-text-muted)",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BarChart.displayName = "BarChart";
