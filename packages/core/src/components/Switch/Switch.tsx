import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  id,
  className,
  style,
  ...rest
}, ref) => {
  const switchId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div ref={ref} className={className} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", ...style }} {...rest}>
      {(label || description) && (
        <div>
          {label && (
            <label
              htmlFor={switchId}
              style={{
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                color: "var(--neu-text-primary)",
              }}
            >
              {label}
            </label>
          )}
          {description && (
            <p style={{ fontSize: "12px", color: "var(--neu-text-secondary)", marginTop: "2px" }}>
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
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "54px",
          height: "30px",
          borderRadius: "999px",
          cursor: disabled ? "not-allowed" : "pointer",
          flexShrink: 0,
          border: "none",
          outline: "none",
          opacity: disabled ? 0.5 : 1,
          background: checked
            ? "linear-gradient(145deg, #8490fa, #5a6cf5)"
            : "var(--neu-bg)",
          boxShadow: checked
            ? "inset 3px 3px 8px rgba(60,78,200,0.35), inset -2px -2px 6px rgba(255,255,255,0.3)"
            : "var(--neu-shadow-inset-sm)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <RadixSwitch.Thumb
          style={{
            display: "block",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "var(--neu-bg)",
            boxShadow: "3px 3px 8px var(--neu-shadow-dark), -2px -2px 6px var(--neu-shadow-light)",
            transform: checked ? "translateX(27px)" : "translateX(3px)",
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </RadixSwitch.Root>
    </div>
  );
});
Switch.displayName = "Switch";
