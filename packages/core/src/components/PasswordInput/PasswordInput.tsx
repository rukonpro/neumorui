import React, { useState, useMemo } from "react";

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text displayed above the input */
  label?: string;
  /** Hint text shown below the input */
  helperText?: string;
  /** Error message replaces helper text */
  error?: string;
  /** Show a password strength meter below input */
  showStrength?: boolean;
}

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: "Weak", color: "var(--neu-danger)" };
  if (score <= 3) return { score, label: "Medium", color: "var(--neu-warning)" };
  return { score, label: "Strong", color: "var(--neu-success)" };
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, helperText, error, showStrength = false, className, id, style, onChange, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-") || "password";
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("");

    const strength = useMemo(() => getStrength(value), [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    const inputStyle: React.CSSProperties = {
      width: "100%",
      fontFamily: "inherit",
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--neu-text-primary)",
      background: "var(--neu-bg)",
      border: "none",
      outline: "none",
      borderRadius: "14px",
      padding: "13px 46px 13px 16px",
      boxShadow: focused
        ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
        : error
          ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
          : "var(--neu-shadow-inset)",
      transition: "box-shadow 0.2s ease",
      ...style,
    };

    const btnStyle: React.CSSProperties = {
      position: "absolute",
      right: "6px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "34px",
      height: "34px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      color: "var(--neu-text-muted)",
      background: "var(--neu-bg)",
      boxShadow: "var(--neu-shadow-raised-sm)",
      transition: "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)",
    };

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
        <div style={{ position: "relative" }}>
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            className={className}
            style={inputStyle}
            onChange={handleChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            style={btnStyle}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {showStrength && value.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "999px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-inset-sm)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(strength.score / 5) * 100}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background: strength.color,
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontSize: "10px", fontWeight: 700, color: strength.color, minWidth: "48px" }}>
              {strength.label}
            </span>
          </div>
        )}

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

PasswordInput.displayName = "PasswordInput";
