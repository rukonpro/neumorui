import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Hint text shown below the textarea */
  helperText?: string;
  /** Error message replaces helper text */
  error?: string;
  /** CSS resize behavior for the textarea */
  resize?: "none" | "both" | "horizontal" | "vertical";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, helperText, error, resize = "vertical", className, id, rows = 4, style, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    const [focused, setFocused] = React.useState(false);

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
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
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
            minHeight: "90px",
            lineHeight: 1.6,
            resize,
            ...style,
          }}
          {...props}
        />
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

Textarea.displayName = "Textarea";
