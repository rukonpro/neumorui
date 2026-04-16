import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled,
}) => {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && (
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--neu-text-secondary)" }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--neu-accent)" }}
            >
              {(value ?? defaultValue)[0]}
            </span>
          )}
        </div>
      )}
      <RadixSlider.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="relative flex items-center w-full h-6 cursor-pointer"
      >
        <RadixSlider.Track
          className="relative flex-1 h-1.5 rounded-full"
          style={{ boxShadow: "var(--neu-shadow-inset-sm)", background: "var(--neu-bg)" }}
        >
          <RadixSlider.Range
            className="absolute h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--neu-accent-light), var(--neu-accent))",
              boxShadow: "2px 0 8px var(--neu-accent-glow)",
            }}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-6 h-6 rounded-full outline-none neu-transition hover:scale-110 focus-visible:scale-110"
          style={{
            background: "var(--neu-gradient-primary)",
            boxShadow: "3px 3px 8px var(--neu-accent-glow), -2px -2px 5px var(--neu-shadow-light)",
          }}
        />
      </RadixSlider.Root>
    </div>
  );
};
