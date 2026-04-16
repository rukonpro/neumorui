import React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
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
        <div className="relative">
          {leftIcon && (
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
              style={{ color: "var(--neu-text-secondary)" }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full font-[inherit] text-sm outline-none border-none rounded-neu",
              "py-3 px-4 neu-inset neu-transition",
              "placeholder:opacity-60",
              "focus:ring-2 focus:ring-[var(--neu-accent)]/30",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "ring-2 ring-[var(--neu-danger)]/40",
              className
            )}
            style={{
              background: "var(--neu-bg)",
              color: "var(--neu-text-primary)",
            }}
            {...props}
          />
          {rightIcon && (
            <span
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
              style={{ color: "var(--neu-text-secondary)" }}
            >
              {rightIcon}
            </span>
          )}
        </div>
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

Input.displayName = "Input";
