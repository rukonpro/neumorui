import React, { useState, useCallback } from "react";

interface ColorPickerProps {
  /** Controlled hex color value */
  value?: string;
  /** Initial color when uncontrolled */
  defaultValue?: string;
  /** Called when color changes */
  onChange?: (color: string) => void;
  /** Array of preset hex color swatches */
  presets?: string[];
  /** Label text above the picker */
  label?: string;
  /** Show hex input and preview */
  showInput?: boolean;
  /** Disable the picker */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const DEFAULT_PRESETS = [
  "#6c7ef8", "#5b9ee0", "#4dbfa0", "#e07090", "#e8a84b",
  "#f87c6c", "#5ecba1", "#f9c74f", "#7c8ffa", "#ff6b6b",
  "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dfe6e9",
  "#2d3436", "#636e72", "#b2bec3", "#ffffff", "#000000",
];

const SwatchButton: React.FC<{
  color: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}> = ({ color, selected, disabled, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Select color ${color}`}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: color,
        boxShadow: selected
          ? `var(--neu-shadow-inset-sm), 0 0 0 3px ${color}40`
          : hovered
            ? "var(--neu-shadow-raised)"
            : "var(--neu-shadow-raised-sm)",
        transform: selected
          ? "scale(1.1)"
          : hovered
            ? "scale(1.08) translateY(-2px)"
            : "none",
        transition,
        opacity: disabled ? 0.4 : 1,
        position: "relative",
      }}
    >
      {selected && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <path
            d="M3 7l3 3 5-5"
            stroke={isLight(color) ? "#333" : "#fff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length < 6) return true;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({
  value: controlledValue,
  defaultValue = "#6c7ef8",
  onChange,
  presets = DEFAULT_PRESETS,
  label,
  showInput = true,
  disabled = false,
  className,
  style,
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleChange = useCallback((color: string) => {
    setInternalValue(color);
    onChange?.(color);
  }, [onChange]);

  return (
    <div ref={ref} className={className} style={style}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neu-text-secondary)",
            margin: "0 0 10px",
          }}
        >
          {label}
        </p>
      )}

      {/* Preview + Input row */}
      {showInput && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          {/* Color preview */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: value,
              boxShadow: `var(--neu-shadow-raised-sm), 0 0 12px ${value}40`,
              flexShrink: 0,
              transition,
            }}
          />
          {/* Hex input */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "12px",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-inset-sm)",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-muted)" }}>#</span>
            <input
              type="text"
              value={value.replace("#", "")}
              onChange={(e) => {
                const hex = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
                if (hex.length === 6 || hex.length === 3) {
                  handleChange(`#${hex}`);
                } else {
                  setInternalValue(`#${hex}`);
                }
              }}
              disabled={disabled}
              maxLength={6}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                color: "var(--neu-text-primary)",
                textTransform: "uppercase",
              }}
              aria-label="Hex color value"
            />
            {/* Native color picker */}
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              style={{
                width: "24px",
                height: "24px",
                border: "none",
                padding: 0,
                cursor: disabled ? "not-allowed" : "pointer",
                borderRadius: "6px",
                overflow: "hidden",
              }}
              aria-label="Open color picker"
            />
          </div>
        </div>
      )}

      {/* Preset swatches */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(32px, 1fr))",
          gap: "8px",
          padding: "12px",
          borderRadius: "16px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-inset-sm)",
        }}
      >
        {presets.map((color) => (
          <SwatchButton
            key={color}
            color={color}
            selected={value.toLowerCase() === color.toLowerCase()}
            disabled={disabled}
            onClick={() => handleChange(color)}
          />
        ))}
      </div>
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";
