import React, { useState, useCallback } from "react";

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  /** Label text displayed above the input */
  label?: string;
  /** Hint text shown below the input */
  helperText?: string;
  /** Error message replaces helper text */
  error?: string;
  /** Controlled numeric value */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  /** Callback fired when value changes */
  onChange?: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment for stepper buttons */
  step?: number;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, helperText, error, value: controlledValue, defaultValue = 0, onChange, min, max, step = 1, className, id, style, disabled, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-") || "number-input";
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [pressedBtn, setPressedBtn] = useState<"minus" | "plus" | null>(null);

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const updateValue = useCallback((newVal: number) => {
      const clamped = Math.min(Math.max(newVal, min ?? -Infinity), max ?? Infinity);
      if (controlledValue === undefined) setInternalValue(clamped);
      onChange?.(clamped);
    }, [controlledValue, min, max, onChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) updateValue(parsed);
      else if (e.target.value === "" || e.target.value === "-") {
        if (controlledValue === undefined) setInternalValue(0);
      }
    };

    const stepperBtnStyle = (side: "minus" | "plus"): React.CSSProperties => ({
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: 700,
      color: pressedBtn === side ? "var(--neu-accent)" : "var(--neu-text-secondary)",
      background: "var(--neu-bg)",
      boxShadow: pressedBtn === side ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
      transition,
      opacity: disabled ? 0.5 : 1,
      flexShrink: 0,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%" }}>
        {label && (
          <label
            htmlFor={inputId}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px",
            borderRadius: "16px",
            background: "var(--neu-bg)",
            boxShadow: focused
              ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
              : error
                ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
                : "var(--neu-shadow-inset)",
            transition: "box-shadow 0.2s ease",
          }}
        >
          <button
            type="button"
            disabled={disabled || (min !== undefined && currentValue <= min)}
            onClick={() => updateValue(currentValue - step)}
            onMouseDown={() => setPressedBtn("minus")}
            onMouseUp={() => setPressedBtn(null)}
            onMouseLeave={() => setPressedBtn(null)}
            style={stepperBtnStyle("minus")}
            tabIndex={-1}
            aria-label="Decrease"
          >
            −
          </button>
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="numeric"
            className={className}
            value={currentValue}
            onChange={handleInputChange}
            disabled={disabled}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: "center",
              fontFamily: "inherit",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--neu-text-primary)",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "4px 0",
              ...style,
            }}
            {...props}
          />
          <button
            type="button"
            disabled={disabled || (max !== undefined && currentValue >= max)}
            onClick={() => updateValue(currentValue + step)}
            onMouseDown={() => setPressedBtn("plus")}
            onMouseUp={() => setPressedBtn(null)}
            onMouseLeave={() => setPressedBtn(null)}
            style={stepperBtnStyle("plus")}
            tabIndex={-1}
            aria-label="Increase"
          >
            +
          </button>
        </div>

        {error && (
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>
        )}
        {helperText && !error && (
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>{helperText}</p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
