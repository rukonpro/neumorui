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
          "w-[26px] h-[26px] rounded-[9px] flex items-center justify-center cursor-pointer outline-none shrink-0",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "neu-transition"
        )}
        style={{
          background: isChecked ? "var(--neu-gradient-primary)" : "var(--neu-bg)",
          boxShadow: isChecked
            ? "3px 3px 9px rgba(108,126,248,.4), -2px -2px 7px var(--neu-shadow-light)"
            : "var(--neu-shadow-inset-sm)",
        }}
      >
        <RadixCheckbox.Indicator>
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
            <path
              d="M1.5 5.5L5 9 11.5 1.5"
              stroke="white"
              strokeWidth="2.2"
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
