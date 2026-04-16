import React from "react";
import { cn } from "../../utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, helperText, error, resize = "vertical", className, id, rows = 4, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--neu-text-secondary)" }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            "w-full font-[inherit] text-sm outline-none border-none rounded-neu",
            "py-3 px-4 neu-inset neu-transition",
            "placeholder:opacity-60",
            "focus:ring-2 focus:ring-[var(--neu-accent)]/30",
            error && "ring-2 ring-[var(--neu-danger)]/40",
            className
          )}
          style={{
            background: "var(--neu-bg)",
            color: "var(--neu-text-primary)",
            resize,
          }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--neu-danger)" }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
