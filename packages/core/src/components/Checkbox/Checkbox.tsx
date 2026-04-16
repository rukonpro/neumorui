import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "../../utils/cn";

interface CheckboxProps {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
  disabled,
  id,
}) => {
  const checkId = id || label?.toLowerCase().replace(/\s/g, "-");
  const isChecked = checked === true;

  return (
    <div className="flex items-center gap-3">
      <RadixCheckbox.Root
        id={checkId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "neu-transition"
        )}
        style={{
          background: isChecked ? "var(--neu-gradient-primary)" : "var(--neu-bg)",
          boxShadow: isChecked
            ? "3px 3px 8px var(--neu-accent-glow), -2px -2px 6px var(--neu-shadow-light)"
            : "var(--neu-shadow-inset-sm)",
        }}
      >
        <RadixCheckbox.Indicator>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label
          htmlFor={checkId}
          className="text-sm cursor-pointer select-none"
          style={{ color: "var(--neu-text-primary)" }}
        >
          {label}
        </label>
      )}
    </div>
  );
};
