import React from "react";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  orientation = "vertical",
  disabled,
  className,
  style,
  ...rest
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} style={style} {...rest}>
      {label && (
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--neu-text-secondary)" }}
        >
          {label}
        </p>
      )}
      <RadixRadio.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row")}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-start gap-3 cursor-pointer",
              opt.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <RadixRadio.Item
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 outline-none",
                "neu-transition focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]"
              )}
              style={{
                background: "var(--neu-bg-light, var(--neu-bg))",
                boxShadow: "var(--neu-shadow-inset)",
              }}
            >
              <RadixRadio.Indicator
                className="block w-2.5 h-2.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
                  boxShadow: "0 0 6px var(--neu-accent-glow)",
                  animation: "neu-radio-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </RadixRadio.Item>
            <div>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--neu-text-primary)" }}
              >
                {opt.label}
              </div>
              {opt.description && (
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--neu-text-secondary)" }}
                >
                  {opt.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </RadixRadio.Root>
    </div>
  );
};
