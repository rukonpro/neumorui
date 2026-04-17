import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Command as Cmdk } from "cmdk";
import { cn } from "../../utils/cn";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ChevronIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
    <path
      d="M1 5L4.5 8.5L11 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onValueChange,
  label,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  disabled,
  className,
  style,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn("w-full", className)} style={style} {...rest}>
      {label && (
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: "var(--neu-text-secondary)" }}
        >
          {label}
        </p>
      )}
      <RadixPopover.Root open={open} onOpenChange={setOpen}>
        <RadixPopover.Trigger
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-neu text-sm",
            "outline-none cursor-pointer neu-inset neu-transition",
            "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]/40",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          style={{
            background: "var(--neu-bg)",
            color: selected ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
          }}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <span style={{ color: "var(--neu-text-secondary)" }}>
            <ChevronIcon />
          </span>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            sideOffset={8}
            align="start"
            className="z-50 outline-none animate-[fadeUp_0.18s_ease]"
            style={{
              background: "var(--neu-bg)",
              borderRadius: "var(--neu-radius-lg)",
              boxShadow: "var(--neu-shadow-raised-lg)",
              width: "var(--radix-popover-trigger-width)",
              minWidth: 220,
            }}
          >
            <Cmdk className="flex flex-col overflow-hidden rounded-[inherit]">
              <div
                className="px-3 py-2"
                style={{ borderBottom: "1px solid var(--neu-border)" }}
              >
                <Cmdk.Input
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent outline-none text-sm py-1"
                  style={{ color: "var(--neu-text-primary)" }}
                />
              </div>
              <Cmdk.List className="max-h-64 overflow-y-auto p-1.5">
                <Cmdk.Empty
                  className="py-4 text-center text-xs"
                  style={{ color: "var(--neu-text-muted)" }}
                >
                  {emptyMessage}
                </Cmdk.Empty>
                {options.map((opt) => (
                  <Cmdk.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    onSelect={() => {
                      onValueChange?.(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-neu cursor-pointer neu-transition",
                      "data-[selected=true]:shadow-neu-inset-sm",
                      "data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
                    )}
                    style={{ color: "var(--neu-text-primary)" }}
                  >
                    <span
                      className="w-4 h-4 shrink-0 inline-flex items-center justify-center"
                      style={{ color: "var(--neu-accent)" }}
                    >
                      {value === opt.value && <CheckIcon />}
                    </span>
                    <span className="flex-1">
                      {opt.label}
                      {opt.description && (
                        <span
                          className="block text-xs mt-0.5"
                          style={{ color: "var(--neu-text-muted)" }}
                        >
                          {opt.description}
                        </span>
                      )}
                    </span>
                  </Cmdk.Item>
                ))}
              </Cmdk.List>
            </Cmdk>
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </div>
  );
};
