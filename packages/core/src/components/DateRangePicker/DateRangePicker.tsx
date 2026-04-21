import React, { useState, useRef, useEffect } from "react";

interface DateRangePickerProps {
  /** Label text above the input */
  label?: string;
  /** Initial start date (YYYY-MM-DD) */
  startDate?: string;
  /** Initial end date (YYYY-MM-DD) */
  endDate?: string;
  /** Called with selected start and end dates */
  onChange?: (start: string, end: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Disable the picker */
  disabled?: boolean;
  /** Error message below the input */
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({
  label,
  startDate,
  endDate,
  onChange,
  placeholder = "Select date range",
  disabled,
  error,
  className,
  style,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [start, setStart] = useState(startDate || "");
  const [end, setEnd] = useState(endDate || "");
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [viewDate, setViewDate] = useState(new Date());
  const internalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (internalRef.current && !internalRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = daysInMonth(year, month);

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(new Date(year, month, day));
    if (selecting === "start") {
      setStart(dateStr);
      setEnd("");
      setSelecting("end");
    } else {
      if (dateStr < start) {
        setStart(dateStr);
        setEnd(start);
      } else {
        setEnd(dateStr);
      }
      setSelecting("start");
      onChange?.(dateStr < start ? dateStr : start, dateStr < start ? start : dateStr);
      setOpen(false);
    }
  };

  const isInRange = (day: number): boolean => {
    if (!start || !end) return false;
    const d = formatDate(new Date(year, month, day));
    return d >= start && d <= end;
  };

  const isStart = (day: number) => formatDate(new Date(year, month, day)) === start;
  const isEnd = (day: number) => formatDate(new Date(year, month, day)) === end;

  const displayValue = start && end ? `${start} → ${end}` : start || "";

  return (
    <div ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%", position: "relative", ...style }}>
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
          color: displayValue ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
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
        {displayValue || placeholder}
      </button>

      {error && <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>}

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          zIndex: 50,
          padding: "16px",
          borderRadius: "18px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "neuDrpIn 0.2s ease",
          minWidth: "280px",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <button type="button" onClick={() => setViewDate(new Date(year, month - 1))} style={{ width: 28, height: 28, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--neu-text-secondary)", transition }}>
              ‹
            </button>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--neu-text-primary)" }}>
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={() => setViewDate(new Date(year, month + 1))} style={{ width: 28, height: 28, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--neu-text-secondary)", transition }}>
              ›
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
            {DAYS.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)", padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Days */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const inRange = isInRange(day);
              const isS = isStart(day);
              const isE = isEnd(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: isS || isE ? "10px" : inRange ? "4px" : "10px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    color: isS || isE ? "#fff" : inRange ? "var(--neu-accent)" : "var(--neu-text-primary)",
                    background: isS || isE
                      ? "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))"
                      : inRange
                        ? "rgba(108,126,248,0.1)"
                        : "transparent",
                    boxShadow: isS || isE ? "2px 2px 6px rgba(100,80,220,0.3)" : "none",
                    transition,
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Selection status */}
          <div style={{ marginTop: "10px", fontSize: "11px", fontWeight: 700, color: "var(--neu-text-muted)", textAlign: "center" }}>
            {selecting === "start" ? "Select start date" : "Select end date"}
          </div>
        </div>
      )}

      <style>{`@keyframes neuDrpIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
