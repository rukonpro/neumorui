import React from "react";

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  horizontal?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  helperText,
  error,
  required,
  children,
  horizontal = false,
}) => {
  const labelId = htmlFor || label?.toLowerCase().replace(/\s/g, "-");

  if (horizontal) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          width: "100%",
        }}
      >
        {label && (
          <label
            htmlFor={labelId}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--neu-text-primary)",
              minWidth: "120px",
              paddingTop: "13px",
              flexShrink: 0,
            }}
          >
            {label}
            {required && (
              <span style={{ color: "var(--neu-danger)", marginLeft: "3px" }}>*</span>
            )}
          </label>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          {children}
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
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%" }}>
      {label && (
        <label
          htmlFor={labelId}
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--neu-text-secondary)",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--neu-danger)", marginLeft: "3px", fontSize: "13px" }}>*</span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>
      )}
      {helperText && !error && (
        <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>{helperText}</p>
      )}
    </div>
  );
};

FormField.displayName = "FormField";
