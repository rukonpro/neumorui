import React, { useState, useRef, useEffect } from "react";

interface TimePickerProps {
  label?: string;
  value?: string;
  onChange?: (time: string) => void;
  use24Hour?: boolean;
  minuteStep?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  use24Hour = false,
  minuteStep = 5,
  placeholder = "Select time",
  disabled,
  error,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":").map(Number);
      if (use24Hour) {
        setHour(h);
      } else {
        setHour(h > 12 ? h - 12 : h === 0 ? 12 : h);
        setPeriod(h >= 12 ? "PM" : "AM");
      }
      setMinute(m);
    }
  }, [value, use24Hour]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDisplay = (): string => {
    if (use24Hour) {
      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
  };

  const emitChange = (h: number, m: number, p: "AM" | "PM") => {
    let h24 = h;
    if (!use24Hour) {
      if (p === "PM" && h !== 12) h24 = h + 12;
      if (p === "AM" && h === 12) h24 = 0;
    }
    onChange?.(`${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  };

  const maxHour = use24Hour ? 23 : 12;
  const minHour = use24Hour ? 0 : 1;

  const incHour = () => {
    const next = hour >= maxHour ? minHour : hour + 1;
    setHour(next);
    emitChange(next, minute, period);
  };
  const decHour = () => {
    const next = hour <= minHour ? maxHour : hour - 1;
    setHour(next);
    emitChange(next, minute, period);
  };
  const incMinute = () => {
    const next = minute + minuteStep >= 60 ? 0 : minute + minuteStep;
    setMinute(next);
    emitChange(hour, next, period);
  };
  const decMinute = () => {
    const next = minute - minuteStep < 0 ? 60 - minuteStep : minute - minuteStep;
    setMinute(next);
    emitChange(hour, next, period);
  };
  const togglePeriod = () => {
    const next = period === "AM" ? "PM" : "AM";
    setPeriod(next);
    emitChange(hour, minute, next);
  };

  const spinnerBtnStyle: React.CSSProperties = {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--neu-text-secondary)",
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    transition,
  };

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%", position: "relative", ...style }}>
      {label && (
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neu-text-secondary)" }}>
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: "14px",
          border: "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "left",
          color: value ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
          background: "var(--neu-bg)",
          boxShadow: focused
            ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
            : error
              ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
              : "var(--neu-shadow-inset)",
          transition: "box-shadow 0.2s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {value ? formatDisplay() : placeholder}
      </button>

      {error && <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>}

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          zIndex: 50,
          padding: "18px",
          borderRadius: "18px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "neuTpIn 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          {/* Hour */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <button type="button" onClick={incHour} style={spinnerBtnStyle}>▲</button>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 900, color: "var(--neu-text-primary)", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset)" }}>
              {String(hour).padStart(2, "0")}
            </div>
            <button type="button" onClick={decHour} style={spinnerBtnStyle}>▼</button>
          </div>

          <span style={{ fontSize: "22px", fontWeight: 900, color: "var(--neu-text-muted)" }}>:</span>

          {/* Minute */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <button type="button" onClick={incMinute} style={spinnerBtnStyle}>▲</button>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 900, color: "var(--neu-text-primary)", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset)" }}>
              {String(minute).padStart(2, "0")}
            </div>
            <button type="button" onClick={decMinute} style={spinnerBtnStyle}>▼</button>
          </div>

          {/* AM/PM */}
          {!use24Hour && (
            <button
              type="button"
              onClick={togglePeriod}
              style={{
                padding: "10px 14px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 800,
                fontFamily: "inherit",
                color: "var(--neu-accent)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                transition,
              }}
            >
              {period}
            </button>
          )}
        </div>
      )}

      <style>{`@keyframes neuTpIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

TimePicker.displayName = "TimePicker";
