import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

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
    <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
      <RadixCheckbox.Root
        id={checkId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "9px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          border: "none",
          opacity: disabled ? 0.5 : 1,
          background: isChecked
            ? "linear-gradient(145deg, #8490fa, #5a6cf5)"
            : "var(--neu-bg)",
          boxShadow: isChecked
            ? "3px 3px 9px rgba(108,126,248,.4), -2px -2px 7px var(--neu-shadow-light)"
            : "var(--neu-shadow-inset-sm)",
          transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onClick={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(0.85)";
          setTimeout(() => { el.style.transform = ""; }, 150);
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
          style={{
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
            color: "var(--neu-text-primary)",
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};
