import React from "react";
import * as RadixSelect from "@radix-ui/react-select";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  label,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: "var(--neu-text-secondary)" }}
        >
          {label}
        </p>
      )}
      <RadixSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <RadixSelect.Trigger
          className="w-full flex items-center justify-between px-4 py-3 rounded-neu text-sm outline-none cursor-pointer neu-inset neu-transition border-0"
          style={{
            background: "var(--neu-bg)",
            color: value ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
            font: "inherit",
          }}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className="z-50 overflow-hidden rounded-neu-lg p-1"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-lg)",
              minWidth: "var(--radix-select-trigger-width)",
            }}
          >
            <RadixSelect.Viewport>
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="px-4 py-2.5 text-sm rounded-neu cursor-pointer outline-none neu-transition data-[highlighted]:shadow-neu-inset disabled:opacity-50"
                  style={{ color: "var(--neu-text-primary)" }}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
