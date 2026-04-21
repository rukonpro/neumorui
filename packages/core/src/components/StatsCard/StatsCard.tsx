import React, { useState, useEffect, useRef } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  color?: string;
  description?: string;
  animate?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Parse a display string like "$12,340" or "1,024" into a numeric value and its format parts */
function parseValue(val: string | number): {
  number: number;
  prefix: string;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
} {
  const str = String(val);
  const match = str.match(/^([^0-9]*?)([\d,]+\.?\d*)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: "", decimals: 0, hasCommas: false };

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const hasCommas = numStr.includes(",");
  const clean = numStr.replace(/,/g, "");
  const dotIdx = clean.indexOf(".");
  const decimals = dotIdx >= 0 ? clean.length - dotIdx - 1 : 0;

  return { number: parseFloat(clean) || 0, prefix, suffix, decimals, hasCommas };
}

function formatNumber(n: number, decimals: number, hasCommas: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!hasCommas) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withCommas}.${decPart}` : withCommas;
}

function AnimatedValue({ value, color, animate, duration }: {
  value: string | number;
  color?: string;
  animate: boolean;
  duration: number;
}) {
  const { number: target, prefix, suffix, decimals, hasCommas } = parseValue(value);
  const [display, setDisplay] = useState(animate ? `${prefix}0${suffix}` : String(value));
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || hasAnimated.current || target === 0) {
      setDisplay(String(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setDisplay(`${prefix}${formatNumber(current, decimals, hasCommas)}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, target, prefix, suffix, decimals, hasCommas, duration, value]);

  return (
    <div
      ref={ref}
      style={{
        fontSize: "1.8rem",
        fontWeight: 900,
        letterSpacing: "-0.03em",
        color: color || "var(--neu-accent)",
        lineHeight: 1.1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {display}
    </div>
  );
}

export function StatsCard({
  label,
  value,
  trend,
  color,
  description,
  animate = true,
  duration = 1200,
  className,
  style,
  ...rest
}: StatsCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      style={{
        padding: "14px",
        borderRadius: "16px",
        boxShadow: hovered ? "var(--neu-shadow-raised-lg)" : "var(--neu-shadow-raised)",
        background: "var(--neu-bg)",
        transform: hovered ? "translateY(-3px)" : undefined,
        transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
        ...style,
      }}
      data-testid="stats-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <div
        style={{
          fontSize: "11px",
          color: "var(--neu-text-secondary)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <AnimatedValue value={value} color={color} animate={animate} duration={duration} />

      {trend && (
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            marginTop: "4px",
            color: trend.direction === "up" ? "var(--neu-success)" : "var(--neu-danger)",
          }}
        >
          {trend.direction === "up" ? "↑" : "↓"} {trend.value}
        </div>
      )}
      {description && (
        <div style={{ fontSize: "11px", color: "var(--neu-text-secondary)" }}>
          {description}
        </div>
      )}
    </div>
  );
}
StatsCard.displayName = "StatsCard";
