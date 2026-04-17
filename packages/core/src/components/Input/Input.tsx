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
              style={{ color: "var(--neu-text-muted)" }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full font-[inherit] text-sm font-semibold outline-none border-none rounded-neu",
              "py-[13px] px-4 neu-inset neu-transition",
              "placeholder:font-medium",
              "focus:ring-[3px] focus:ring-[var(--neu-accent)]/20",
              leftIcon && "pl-[42px]",
              rightIcon && "pr-[42px]",
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
              style={{ color: "var(--neu-text-muted)" }}
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
