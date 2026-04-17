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
        className="relative flex items-center w-full h-7 cursor-pointer"
      >
        <RadixSlider.Track
          className="relative flex-1 h-2 rounded-full"
          style={{ boxShadow: "var(--neu-shadow-inset-sm)", background: "var(--neu-bg)" }}
        >
          <RadixSlider.Range
            className="absolute h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #9aa2fb, #5a6cf5)",
            }}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-[26px] h-[26px] rounded-full outline-none neu-transition hover:scale-[1.2] focus-visible:scale-[1.2]"
          style={{
            background: "linear-gradient(145deg, #9aa2fb, #5a6cf5)",
            boxShadow: "3px 3px 9px rgba(108,126,248,.45), -2px -2px 6px var(--neu-shadow-light)",
          }}
        />
      </RadixSlider.Root>
    </div>
  );
};
