import React, { useState, useEffect, useCallback, useRef } from "react";

interface CountdownProps {
  targetDate: Date | string | number;
  onComplete?: () => void;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  size?: "sm" | "md" | "lg";
  variant?: "raised" | "inset";
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<string, { box: number; numSize: string; labelSize: string; gap: number }> = {
  sm: { box: 52, numSize: "18px", labelSize: "9px", gap: 8 },
  md: { box: 72, numSize: "26px", labelSize: "10px", gap: 12 },
  lg: { box: 92, numSize: "34px", labelSize: "11px", gap: 16 },
};

function getTimeLeft(target: number): { days: number; hours: number; minutes: number; seconds: number } {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownUnit: React.FC<{
  value: number;
  label: string;
  size: string;
  variant: string;
  prevValue: number;
}> = ({ value, label, size, variant, prevValue }) => {
  const { box, numSize, labelSize } = sizeMap[size];
  const changed = value !== prevValue;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          width: box,
          height: box,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--neu-bg)",
          boxShadow: variant === "inset"
            ? "var(--neu-shadow-inset-sm)"
            : "var(--neu-shadow-raised)",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <span
          style={{
            fontSize: numSize,
            fontWeight: 900,
            color: "var(--neu-accent)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
            animation: changed ? "countFlip 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontSize: labelSize,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--neu-text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const Separator: React.FC<{ size: string }> = ({ size }) => {
  const { numSize } = sizeMap[size];
  return (
    <span
      style={{
        fontSize: numSize,
        fontWeight: 800,
        color: "var(--neu-text-muted)",
        alignSelf: "flex-start",
        marginTop: `${sizeMap[size].box * 0.25}px`,
        animation: "blink 1s step-end infinite",
      }}
    >
      :
    </span>
  );
};

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  onComplete,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  labels = {},
  size = "md",
  variant = "raised",
  className,
  style,
}) => {
  const target = typeof targetDate === "number"
    ? targetDate
    : new Date(targetDate).getTime();

  const [time, setTime] = useState(() => getTimeLeft(target));
  const prevTime = useRef(time);
  const completedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft(target);
      prevTime.current = time;
      setTime(next);
      if (
        !completedRef.current &&
        next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0
      ) {
        completedRef.current = true;
        onComplete?.();
      }
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, onComplete, time]);

  const { gap } = sizeMap[size];
  const units: { key: string; value: number; prev: number; label: string; show: boolean }[] = [
    { key: "days", value: time.days, prev: prevTime.current.days, label: labels.days || "Days", show: showDays },
    { key: "hours", value: time.hours, prev: prevTime.current.hours, label: labels.hours || "Hours", show: showHours },
    { key: "minutes", value: time.minutes, prev: prevTime.current.minutes, label: labels.minutes || "Min", show: showMinutes },
    { key: "seconds", value: time.seconds, prev: prevTime.current.seconds, label: labels.seconds || "Sec", show: showSeconds },
  ].filter((u) => u.show);

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: `${gap}px`,
        ...style,
      }}
    >
      {units.map((u, i) => (
        <React.Fragment key={u.key}>
          <CountdownUnit
            value={u.value}
            label={u.label}
            size={size}
            variant={variant}
            prevValue={u.prev}
          />
          {i < units.length - 1 && <Separator size={size} />}
        </React.Fragment>
      ))}
      <style>{`
        @keyframes countFlip {
          0% { transform: scaleY(0.6); opacity: 0.5; }
          50% { transform: scaleY(1.08); }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

Countdown.displayName = "Countdown";
