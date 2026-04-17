import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className, id, style, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    const [focused, setFocused] = React.useState(false);

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
      padding: "13px 16px",
      boxShadow: focused
        ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
        : error
          ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
          : "var(--neu-shadow-inset)",
      transition: "box-shadow 0.2s ease",
      ...(leftIcon ? { paddingLeft: "42px" } : {}),
      ...(rightIcon ? { paddingRight: "42px" } : {}),
      ...style,
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
              textTransform: "uppercase" as const,
              color: "var(--neu-text-secondary)",
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: "relative" }}>
          {leftIcon && (
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "var(--neu-text-muted)",
                pointerEvents: "none",
              }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={className}
            style={inputStyle}
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
          {rightIcon && (
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "var(--neu-text-muted)",
                pointerEvents: "none",
              }}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
