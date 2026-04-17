import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../../utils/cn";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  id,
}) => {
  const switchId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div>
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium cursor-pointer"
              style={{ color: "var(--neu-text-primary)" }}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs mt-0.5" style={{ color: "var(--neu-text-secondary)" }}>
              {description}
            </p>
          )}
        </div>
      )}
      <RadixSwitch.Root
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center shrink-0 cursor-pointer rounded-full px-[3px]",
          "transition-all duration-300 outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]"
        )}
        style={{
          width: "54px",
          height: "30px",
          boxShadow: checked
            ? "inset 3px 3px 8px rgba(60,78,200,0.35), inset -2px -2px 6px rgba(255,255,255,0.3)"
            : "var(--neu-shadow-inset-sm)",
          background: checked ? "var(--neu-gradient-primary)" : "var(--neu-bg)",
        }}
      >
        <RadixSwitch.Thumb
          className="block rounded-full"
          style={{
            width: "24px",
            height: "24px",
            background: "var(--neu-bg)",
            boxShadow:
              "3px 3px 8px var(--neu-shadow-dark), -2px -2px 6px var(--neu-shadow-light)",
            transform: checked ? "translateX(24px)" : "translateX(0px)",
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </RadixSwitch.Root>
    </div>
  );
};
