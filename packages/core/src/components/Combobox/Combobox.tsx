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

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

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

const ComboboxItem: React.FC<{
  opt: ComboboxOption;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ opt, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Cmdk.Item
      value={opt.value}
      disabled={opt.disabled}
      onSelect={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "12px",
        cursor: opt.disabled ? "not-allowed" : "pointer",
        opacity: opt.disabled ? 0.5 : 1,
        fontSize: "14px",
        fontWeight: isSelected ? 700 : 600,
        color: isSelected ? "var(--neu-accent)" : "var(--neu-text-primary)",
        background: "var(--neu-bg)",
        boxShadow: isSelected
          ? "var(--neu-shadow-inset-sm)"
          : hovered
            ? "var(--neu-shadow-raised-sm)"
            : "none",
        transform: hovered && !isSelected ? "translateX(4px)" : "none",
        transition,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "7px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "var(--neu-bg)",
          boxShadow: isSelected
            ? "var(--neu-shadow-inset-sm)"
            : "var(--neu-shadow-raised-sm)",
          color: "var(--neu-accent)",
          fontSize: "10px",
          transition,
        }}
      >
        {isSelected && <CheckIcon />}
      </span>
      <span style={{ flex: 1 }}>
        {opt.label}
        {opt.description && (
          <span
            style={{
              display: "block",
              fontSize: "11px",
              marginTop: "2px",
              color: "var(--neu-text-muted)",
            }}
          >
            {opt.description}
          </span>
        )}
      </span>
    </Cmdk.Item>
  );
};

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
  const [triggerHovered, setTriggerHovered] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn(className)} style={{ width: "100%", ...style }} {...rest}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neu-text-secondary)",
            marginBottom: "8px",
            margin: "0 0 8px",
          }}
        >
          {label}
        </p>
      )}
      <RadixPopover.Root open={open} onOpenChange={setOpen}>
        <RadixPopover.Trigger
          disabled={disabled}
          onMouseEnter={() => setTriggerHovered(true)}
          onMouseLeave={() => setTriggerHovered(false)}
          style={{
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
            color: selected ? "var(--neu-text-primary)" : "var(--neu-text-muted)",
            boxShadow: open
              ? "var(--neu-shadow-inset-sm)"
              : triggerHovered
                ? "var(--neu-shadow-raised)"
                : "var(--neu-shadow-raised-sm)",
            transform: triggerHovered && !open ? "translateY(-1px)" : "none",
            transition,
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selected ? selected.label : placeholder}
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            style={{
              flexShrink: 0,
              color: "var(--neu-text-secondary)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            sideOffset={8}
            align="start"
            style={{
              zIndex: 50,
              outline: "none",
              background: "var(--neu-bg)",
              borderRadius: "18px",
              boxShadow: "var(--neu-shadow-raised-lg)",
              width: "var(--radix-popover-trigger-width)",
              minWidth: 220,
              overflow: "hidden",
              animation: "fadeUp 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Cmdk
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Search input */}
              <div
                style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--neu-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background: "var(--neu-bg)",
                    boxShadow: "var(--neu-shadow-inset-sm)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ flexShrink: 0, color: "var(--neu-text-muted)" }}
                  >
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <Cmdk.Input
                    placeholder={searchPlaceholder}
                    style={{
                      flex: 1,
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      color: "var(--neu-text-primary)",
                    }}
                  />
                </div>
              </div>

              {/* Options list */}
              <Cmdk.List
                style={{
                  maxHeight: "260px",
                  overflowY: "auto",
                  padding: "8px",
                }}
              >
                <Cmdk.Empty
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--neu-text-muted)",
                  }}
                >
                  {emptyMessage}
                </Cmdk.Empty>
                {options.map((opt) => (
                  <ComboboxItem
                    key={opt.value}
                    opt={opt}
                    isSelected={value === opt.value}
                    onSelect={() => {
                      onValueChange?.(opt.value);
                      setOpen(false);
                    }}
                  />
                ))}
              </Cmdk.List>
            </Cmdk>

            {/* Style for cmdk internals */}
            <style>{`
              [cmdk-input]::placeholder {
                color: var(--neu-text-muted);
              }
            `}</style>
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </div>
  );
};
Combobox.displayName = "Combobox";
