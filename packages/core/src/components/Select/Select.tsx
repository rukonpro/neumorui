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
  className?: string;
  style?: React.CSSProperties;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  label,
  disabled,
  className,
  style,
  ...rest
}, ref) => {
  return (
    <div ref={ref} className={["w-full", className].filter(Boolean).join(" ")} style={style} {...rest}>
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
          className="w-full flex items-center justify-between px-4 py-[13px] rounded-neu text-sm font-semibold outline-none cursor-pointer neu-inset neu-transition border-0 focus-visible:ring-[3px] focus-visible:ring-[var(--neu-accent)]/20"
          style={{
            background: "var(--neu-bg)",
            color: value ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
            font: "inherit",
          }}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon style={{ color: "var(--neu-text-muted)" }}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
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
              animation: "neu-slide-down 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
            }}
          >
            <RadixSelect.Viewport>
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="px-4 py-2.5 text-sm rounded-neu cursor-pointer outline-none neu-transition data-[highlighted]:shadow-neu-inset-sm disabled:opacity-50"
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
});
Select.displayName = "Select";
