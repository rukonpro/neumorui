import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "../Calendar/Calendar";
import { cn } from "../../utils/cn";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 6h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  disabled,
  dateFormat = "PP",
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--neu-text-secondary)" }}
        >
          {label}
        </label>
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
            color: value ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
          }}
        >
          <span>{value ? format(value, dateFormat) : placeholder}</span>
          <span style={{ color: "var(--neu-text-secondary)" }}>
            <CalendarIcon />
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
            }}
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={(d) => {
                onChange?.(d);
                if (d) setOpen(false);
              }}
              disabled={
                minDate || maxDate
                  ? [
                      minDate ? { before: minDate } : undefined,
                      maxDate ? { after: maxDate } : undefined,
                    ].filter(Boolean) as any
                  : undefined
              }
            />
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </div>
  );
};
