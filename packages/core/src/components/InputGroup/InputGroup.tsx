import React, { useState } from "react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message below the input */
  error?: string;
  /** Addon element on the left side */
  leftAddon?: React.ReactNode;
  /** Addon element on the right side */
  rightAddon?: React.ReactNode;
  /** Inline icon on the left */
  leftElement?: React.ReactNode;
  /** Inline icon on the right */
  rightElement?: React.ReactNode;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, helperText, error, leftAddon, rightAddon, leftElement, rightElement, className, id, style, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-") || "input-group";
    const [focused, setFocused] = useState(false);

    const addonStyle = (side: "left" | "right"): React.CSSProperties => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 14px",
      fontSize: "13px",
      fontWeight: 700,
      color: "var(--neu-text-secondary)",
      background: "var(--neu-bg)",
      boxShadow: "var(--neu-shadow-raised-sm)",
      borderRadius: side === "left" ? "14px 0 0 14px" : "0 14px 14px 0",
      whiteSpace: "nowrap",
      userSelect: "none",
      transition,
    });

    const elementStyle = (side: "left" | "right"): React.CSSProperties => ({
      position: "absolute",
      [side]: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "16px",
      color: "var(--neu-text-muted)",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
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
            alignItems: "stretch",
            borderRadius: "14px",
            boxShadow: focused
              ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
              : error
                ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
                : "var(--neu-shadow-inset)",
            transition: "box-shadow 0.2s ease",
            overflow: "hidden",
          }}
        >
          {leftAddon && <div style={addonStyle("left")}>{leftAddon}</div>}

          <div style={{ position: "relative", flex: 1, display: "flex" }}>
            {leftElement && <span style={elementStyle("left")}>{leftElement}</span>}
            <input
              ref={ref}
              id={inputId}
              className={className}
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
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--neu-text-primary)",
                background: "var(--neu-bg)",
                border: "none",
                outline: "none",
                padding: "13px 16px",
                ...(leftElement ? { paddingLeft: "42px" } : {}),
                ...(rightElement ? { paddingRight: "42px" } : {}),
                ...style,
              }}
              {...props}
            />
            {rightElement && <span style={elementStyle("right")}>{rightElement}</span>}
          </div>

          {rightAddon && <div style={addonStyle("right")}>{rightAddon}</div>}
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

InputGroup.displayName = "InputGroup";
