import React, { useState, useRef, useCallback, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  masked?: boolean;
  autoFocus?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const sizeMap: Record<string, { box: number; font: string; radius: string }> = {
  sm: { box: 38, font: "16px", radius: "10px" },
  md: { box: 48, font: "20px", radius: "12px" },
  lg: { box: 56, font: "24px", radius: "14px" },
};

const OTPCell: React.FC<{
  value: string;
  focused: boolean;
  filled: boolean;
  error: boolean;
  disabled: boolean;
  masked: boolean;
  size: string;
  onFocus: () => void;
}> = ({ value, focused, filled, error, disabled, masked, size }) => {
  const { box, font, radius } = sizeMap[size];

  const style: React.CSSProperties = {
    width: box,
    height: box,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius,
    fontSize: font,
    fontWeight: 800,
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    border: "none",
    outline: "none",
    background: "var(--neu-bg)",
    color: error
      ? "var(--neu-danger)"
      : filled
        ? "var(--neu-accent)"
        : "var(--neu-text-primary)",
    boxShadow: error
      ? `var(--neu-shadow-inset-sm), 0 0 0 2px var(--neu-danger-glow)`
      : focused
        ? `var(--neu-shadow-inset-sm), 0 0 0 2px var(--neu-accent-glow)`
        : filled
          ? "var(--neu-shadow-inset-sm)"
          : "var(--neu-shadow-raised-sm)",
    transform: focused ? "scale(1.05)" : "none",
    transition,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div style={style}>
      {value ? (masked ? "•" : value) : focused ? (
        <span
          style={{
            width: "2px",
            height: "60%",
            background: "var(--neu-accent)",
            borderRadius: "1px",
            animation: "blink 1s step-end infinite",
          }}
        />
      ) : null}
    </div>
  );
};

export const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  error = false,
  masked = false,
  autoFocus = false,
  label,
  size = "md",
  className,
  style,
}, ref) => {
  const [focusIndex, setFocusIndex] = useState(autoFocus ? 0 : -1);
  const inputRef = useRef<HTMLInputElement>(null);
  const digits = value.split("").slice(0, length);

  // Pad to length
  while (digits.length < length) digits.push("");

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (autoFocus) focusInput();
  }, [autoFocus, focusInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange?.(raw);
    setFocusIndex(Math.min(raw.length, length - 1));
    if (raw.length === length) {
      onComplete?.(raw);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && value.length > 0) {
      onChange?.(value.slice(0, -1));
      setFocusIndex(Math.max(value.length - 2, 0));
    }
  };

  const handleFocus = () => {
    setFocusIndex(Math.min(value.length, length - 1));
  };

  const handleBlur = () => {
    setFocusIndex(-1);
  };

  return (
    <div ref={ref} className={className} style={style}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: error ? "var(--neu-danger)" : "var(--neu-text-secondary)",
            marginBottom: "10px",
            margin: "0 0 10px",
          }}
        >
          {label}
        </p>
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          gap: "8px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={focusInput}
        role="group"
        aria-label={label || "OTP input"}
      >
        {digits.map((d, i) => (
          <OTPCell
            key={i}
            value={d}
            focused={focusIndex === i}
            filled={d !== ""}
            error={error}
            disabled={disabled}
            masked={masked}
            size={size}
            onFocus={() => setFocusIndex(i)}
          />
        ))}
        {/* Hidden input for keyboard capture */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          style={{
            position: "absolute",
            opacity: 0,
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          aria-label={label || "OTP input"}
        />
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
});

OTPInput.displayName = "OTPInput";
