import React, { useState, useRef, useCallback } from "react";

interface PinInputProps {
  length?: number;
  label?: string;
  helperText?: string;
  error?: string;
  mask?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  id?: string;
  className?: string;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

const sizeMap = {
  sm: { box: 38, font: 16, radius: 10, gap: 6 },
  md: { box: 48, font: 20, radius: 12, gap: 8 },
  lg: { box: 56, font: 24, radius: 14, gap: 10 },
};

export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  ({
  length = 4,
  label,
  helperText,
  error,
  mask = false,
  onChange,
  onComplete,
  disabled,
  size = "md",
  id,
  className,
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-") || "pin-input";
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const s = sizeMap[size];

  const handleChange = useCallback(
    (idx: number, val: string) => {
      if (!/^[0-9]?$/.test(val)) return;

      const next = [...values];
      next[idx] = val;
      setValues(next);

      const full = next.join("");
      onChange?.(full);

      if (val && idx < length - 1) {
        refs.current[idx + 1]?.focus();
      }
      if (full.length === length && !next.includes("")) {
        onComplete?.(full);
      }
    },
    [values, length, onChange, onComplete]
  );

  const handleKeyDown = useCallback(
    (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[idx] && idx > 0) {
        refs.current[idx - 1]?.focus();
        const next = [...values];
        next[idx - 1] = "";
        setValues(next);
        onChange?.(next.join(""));
      }
      if (e.key === "ArrowLeft" && idx > 0) refs.current[idx - 1]?.focus();
      if (e.key === "ArrowRight" && idx < length - 1) refs.current[idx + 1]?.focus();
    },
    [values, length, onChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (!pasted) return;

      const next = [...values];
      for (let i = 0; i < pasted.length; i++) {
        next[i] = pasted[i];
      }
      setValues(next);
      onChange?.(next.join(""));

      const focusIdx = Math.min(pasted.length, length - 1);
      refs.current[focusIdx]?.focus();

      if (pasted.length === length) {
        onComplete?.(next.join(""));
      }
    },
    [values, length, onChange, onComplete]
  );

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "fit-content" }}>
      {label && (
        <label
          htmlFor={`${inputId}-0`}
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--neu-text-secondary)",
          }}
        >
          {label}
        </label>
      )}

      <div style={{ display: "flex", gap: `${s.gap}px` }}>
        {Array.from({ length }).map((_, i) => {
          const filled = !!values[i];
          const isFocused = focusedIdx === i;

          return (
            <input
              key={i}
              id={i === 0 ? `${inputId}-0` : undefined}
              ref={(el) => { refs.current[i] = el; }}
              type={mask ? "password" : "text"}
              inputMode="numeric"
              maxLength={1}
              value={values[i]}
              disabled={disabled}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIdx(i)}
              onBlur={() => setFocusedIdx(null)}
              autoComplete="off"
              style={{
                width: `${s.box}px`,
                height: `${s.box}px`,
                borderRadius: `${s.radius}px`,
                border: "none",
                outline: "none",
                textAlign: "center",
                fontSize: `${s.font}px`,
                fontWeight: 800,
                fontFamily: "inherit",
                color: "var(--neu-text-primary)",
                background: "var(--neu-bg)",
                boxShadow: isFocused
                  ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.22)"
                  : error
                    ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
                    : filled
                      ? "var(--neu-shadow-raised-sm)"
                      : "var(--neu-shadow-inset-sm)",
                transition,
                cursor: disabled ? "not-allowed" : "text",
                opacity: disabled ? 0.5 : 1,
                caretColor: "var(--neu-accent)",
              }}
            />
          );
        })}
      </div>

      {error && (
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>
      )}
      {helperText && !error && (
        <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>{helperText}</p>
      )}
    </div>
  );
});

PinInput.displayName = "PinInput";
