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
  className?: string;
  style?: React.CSSProperties;
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
  className,
  style,
}) => {
  return (
    <div className={className} style={{ width: "100%", ...style }}>
      {(label || showValue) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {label && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--neu-text-secondary)",
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--neu-accent)",
              }}
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
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "26px",
          cursor: "pointer",
        }}
      >
        <RadixSlider.Track
          style={{
            position: "relative",
            flex: 1,
            height: "8px",
            borderRadius: "999px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
          }}
        >
          <RadixSlider.Range
            style={{
              position: "absolute",
              height: "100%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #9aa2fb, #5a6cf5)",
            }}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          style={{
            display: "block",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            outline: "none",
            cursor: "pointer",
            background: "linear-gradient(145deg, #9aa2fb, #5a6cf5)",
            boxShadow:
              "3px 3px 9px rgba(108,126,248,.45), -2px -2px 6px var(--neu-shadow-light)",
            transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </RadixSlider.Root>
    </div>
  );
};
Slider.displayName = "Slider";
