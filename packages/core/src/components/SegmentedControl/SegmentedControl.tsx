import React, { useState, useRef, useEffect, useCallback } from "react";

interface SegmentOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.25s cubic-bezier(0.34, 1.4, 0.64, 1)";

const sizeMap: Record<string, { padding: string; fontSize: string; height: number; radius: string; innerRadius: string }> = {
  sm: { padding: "4px", fontSize: "12px", height: 32, radius: "12px", innerRadius: "9px" },
  md: { padding: "5px", fontSize: "13px", height: 40, radius: "14px", innerRadius: "10px" },
  lg: { padding: "6px", fontSize: "15px", height: 48, radius: "16px", innerRadius: "12px" },
};

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
  style,
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const value = controlledValue ?? internalValue;
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const { padding, fontSize, height, radius, innerRadius } = sizeMap[size];

  const updateIndicator = useCallback(() => {
    if (!containerRef.current) return;
    const activeIdx = options.findIndex((o) => o.value === value);
    if (activeIdx < 0) return;
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>("[data-segment-btn]");
    const btn = buttons[activeIdx];
    if (!btn) return;
    setIndicatorStyle({
      width: btn.offsetWidth,
      transform: `translateX(${btn.offsetLeft}px)`,
    });
  }, [options, value]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={className}
      role="radiogroup"
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        position: "relative",
        padding,
        borderRadius: radius,
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset-sm)",
        height,
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {/* Sliding indicator */}
      <div
        style={{
          position: "absolute",
          top: padding,
          bottom: padding,
          left: 0,
          borderRadius: innerRadius,
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          zIndex: 0,
          ...indicatorStyle,
        }}
      />

      {/* Segments */}
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            data-segment-btn
            disabled={opt.disabled || disabled}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
            style={{
              position: "relative",
              zIndex: 1,
              flex: fullWidth ? 1 : undefined,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: `0 ${size === "sm" ? "12px" : size === "lg" ? "20px" : "16px"}`,
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              cursor: opt.disabled || disabled ? "not-allowed" : "pointer",
              fontSize,
              fontWeight: isActive ? 700 : 600,
              fontFamily: "inherit",
              color: isActive ? "var(--neu-accent)" : "var(--neu-text-secondary)",
              transition,
              whiteSpace: "nowrap",
            }}
          >
            {opt.icon && <span style={{ display: "flex", alignItems: "center", fontSize: "1.1em" }}>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = "SegmentedControl";
