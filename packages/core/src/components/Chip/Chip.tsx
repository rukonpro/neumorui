import React, { useState } from "react";

interface ChipProps {
  children: React.ReactNode;
  /** Visual style variant */
  variant?: "raised" | "outlined" | "filled";
  /** Color theme of the chip */
  color?: "default" | "primary" | "success" | "danger" | "warning";
  /** Size of the chip */
  size?: "sm" | "md" | "lg";
  /** Icon displayed before the label */
  icon?: React.ReactNode;
  /** Show a remove button */
  removable?: boolean;
  /** Called when remove button is clicked */
  onRemove?: () => void;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Click handler for interactive chips */
  onClick?: () => void;
  /** Disable interaction */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const sizeMap: Record<string, { padding: string; fontSize: string; radius: string; removeSize: number }> = {
  sm: { padding: "4px 10px", fontSize: "11px", radius: "8px", removeSize: 14 },
  md: { padding: "6px 14px", fontSize: "12px", radius: "10px", removeSize: 16 },
  lg: { padding: "8px 18px", fontSize: "14px", radius: "12px", removeSize: 18 },
};

const colorMap: Record<string, { accent: string; glow: string }> = {
  default: { accent: "var(--neu-accent)", glow: "var(--neu-accent-glow)" },
  primary: { accent: "var(--neu-accent)", glow: "var(--neu-accent-glow)" },
  success: { accent: "var(--neu-success)", glow: "var(--neu-success-glow)" },
  danger: { accent: "var(--neu-danger)", glow: "var(--neu-danger-glow)" },
  warning: { accent: "var(--neu-warning, #e8a84b)", glow: "var(--neu-warning-glow, rgba(232,168,75,0.35))" },
};

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = "raised",
  color = "default",
  size = "md",
  icon,
  removable = false,
  onRemove,
  selected = false,
  onClick,
  disabled = false,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { padding, fontSize, radius, removeSize } = sizeMap[size];
  const { accent, glow } = colorMap[color];
  const interactive = !!onClick && !disabled;

  const chipStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding,
    borderRadius: radius,
    fontSize,
    fontWeight: 700,
    fontFamily: "inherit",
    border: "none",
    outline: "none",
    cursor: interactive ? "pointer" : disabled ? "not-allowed" : "default",
    opacity: disabled ? 0.5 : 1,
    background: variant === "filled"
      ? accent
      : "var(--neu-bg)",
    color: variant === "filled"
      ? "#fff"
      : selected
        ? accent
        : "var(--neu-text-primary)",
    transition,
    ...style,
  };

  // Shadow based on variant and state
  if (variant === "raised") {
    chipStyle.boxShadow = selected
      ? "var(--neu-shadow-inset-sm)"
      : pressed
        ? "var(--neu-shadow-inset-sm)"
        : hovered
          ? "var(--neu-shadow-raised)"
          : "var(--neu-shadow-raised-sm)";
  } else if (variant === "outlined") {
    chipStyle.boxShadow = selected
      ? `var(--neu-shadow-inset-sm), 0 0 0 2px ${glow}`
      : hovered
        ? `var(--neu-shadow-raised-sm), 0 0 0 1.5px ${glow}`
        : `0 0 0 1.5px var(--neu-border)`;
  } else {
    // filled
    chipStyle.boxShadow = pressed
      ? `inset 3px 3px 6px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.1)`
      : hovered
        ? `4px 4px 12px ${glow}, -3px -3px 8px var(--neu-shadow-light)`
        : `3px 3px 8px ${glow}, -2px -2px 6px var(--neu-shadow-light)`;
  }

  // Transform
  if (pressed && interactive) {
    chipStyle.transform = "scale(0.95)";
  } else if (hovered && interactive) {
    chipStyle.transform = "translateY(-1px)";
  }

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      className={className}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={chipStyle}
    >
      {icon && <span style={{ display: "flex", alignItems: "center", fontSize: "1.1em" }}>{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: removeSize,
            height: removeSize,
            borderRadius: "6px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: 0,
            background: variant === "filled" ? "rgba(255,255,255,0.2)" : "var(--neu-bg)",
            boxShadow: variant === "filled" ? "none" : "var(--neu-shadow-raised-sm)",
            color: variant === "filled" ? "#fff" : "var(--neu-text-muted)",
            fontSize: "10px",
            fontWeight: 800,
            lineHeight: 1,
            transition,
          }}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </Tag>
  );
};

Chip.displayName = "Chip";
