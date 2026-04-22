import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "../Calendar/Calendar";
import { cn } from "../../utils/cn";

interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  /** Callback fired when date selection changes */
  onChange?: (date: Date | undefined) => void;
  /** Label text displayed above the picker */
  label?: string;
  /** Text shown when no date is selected */
  placeholder?: string;
  /** Disable the date picker */
  disabled?: boolean;
  /** Date-fns format string for display */
  dateFormat?: string;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

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
  className,
  style,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const triggerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "14px 18px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "inherit",
    border: "none",
    outline: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    background: "var(--neu-bg)",
    color: value ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
    boxShadow: open
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised)"
        : "var(--neu-shadow-raised-sm)",
    transform: hovered && !open ? "translateY(-1px)" : "none",
    transition,
  };

  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      {label && (
        <label
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neu-text-secondary)",
          }}
        >
          {label}
        </label>
      )}
      <RadixPopover.Root open={open} onOpenChange={setOpen}>
        <RadixPopover.Trigger
          disabled={disabled}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={triggerStyle}
        >
          <span>{value ? format(value, dateFormat) : placeholder}</span>
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--neu-bg)",
              boxShadow: open
                ? "var(--neu-shadow-inset-sm)"
                : "var(--neu-shadow-raised-sm)",
              color: open ? "var(--neu-accent)" : "var(--neu-text-secondary)",
              flexShrink: 0,
              transition,
            }}
          >
            <CalendarIcon />
          </span>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            sideOffset={8}
            align="start"
            style={{
              zIndex: 50,
              outline: "none",
              background: "var(--neu-bg)",
              borderRadius: "20px",
              boxShadow: "var(--neu-shadow-raised-lg)",
              animation: "neu-slide-down 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
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
DatePicker.displayName = "DatePicker";
