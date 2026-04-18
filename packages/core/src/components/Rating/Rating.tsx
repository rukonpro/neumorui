import React, { useState, useCallback } from "react";

interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  icon?: "star" | "heart";
  readOnly?: boolean;
  disabled?: boolean;
  allowHalf?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)";

const sizeMap: Record<string, { icon: number; gap: number }> = {
  sm: { icon: 20, gap: 4 },
  md: { icon: 28, gap: 6 },
  lg: { icon: 36, gap: 8 },
};

const StarIcon: React.FC<{ size: number; filled: boolean; half: boolean; color: string }> = ({
  size, filled, half, color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {half && (
      <defs>
        <linearGradient id="half-fill">
          <stop offset="50%" stopColor={color} />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? color : half ? "url(#half-fill)" : "none"}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon: React.FC<{ size: number; filled: boolean; half: boolean; color: string }> = ({
  size, filled, half, color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {half && (
      <defs>
        <linearGradient id="half-heart-fill">
          <stop offset="50%" stopColor={color} />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? color : half ? "url(#half-heart-fill)" : "none"}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const RatingItem: React.FC<{
  index: number;
  filled: boolean;
  half: boolean;
  hovered: boolean;
  icon: "star" | "heart";
  iconSize: number;
  readOnly: boolean;
  disabled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}> = ({ index, filled, half, hovered, icon, iconSize, readOnly, disabled, onClick, onMouseEnter }) => {
  const [pressed, setPressed] = useState(false);
  const interactive = !readOnly && !disabled;
  const color = filled || half
    ? icon === "heart" ? "var(--neu-danger)" : "var(--neu-warning, #e8a84b)"
    : "var(--neu-text-muted)";

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "8px",
    cursor: interactive ? "pointer" : "default",
    background: "transparent",
    border: "none",
    outline: "none",
    transform: pressed
      ? "scale(0.85)"
      : hovered && interactive
        ? "scale(1.2) translateY(-2px)"
        : "none",
    filter: hovered && interactive
      ? `drop-shadow(0 2px 6px ${icon === "heart" ? "var(--neu-danger-glow)" : "var(--neu-warning-glow, rgba(232,168,75,0.4))"})`
      : "none",
    transition,
    opacity: disabled ? 0.4 : 1,
  };

  const IconComponent = icon === "heart" ? HeartIcon : StarIcon;

  return (
    <button
      type="button"
      style={style}
      onClick={interactive ? onClick : undefined}
      onMouseEnter={interactive ? onMouseEnter : undefined}
      onMouseDown={() => interactive && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      aria-label={`Rate ${index + 1}`}
      disabled={disabled}
    >
      <IconComponent size={iconSize} filled={filled} half={half} color={color} />
    </button>
  );
};

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size = "md",
  icon = "star",
  readOnly = false,
  disabled = false,
  allowHalf = false,
  label,
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(-1);
  const value = controlledValue ?? internalValue;
  const { icon: iconSize, gap } = sizeMap[size];

  const handleClick = useCallback((idx: number) => {
    const newVal = idx + 1;
    setInternalValue(newVal);
    onChange?.(newVal);
  }, [onChange]);

  const displayValue = hoverValue >= 0 ? hoverValue + 1 : value;

  return (
    <div className={className} style={style}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neu-text-secondary)",
            margin: "0 0 8px",
          }}
        >
          {label}
        </p>
      )}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: `${gap}px`,
          padding: "6px 10px",
          borderRadius: "14px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-inset-sm)",
        }}
        onMouseLeave={() => setHoverValue(-1)}
        role="radiogroup"
        aria-label={label || "Rating"}
      >
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(displayValue);
          const half = allowHalf && !filled && i < displayValue;
          const hovered = hoverValue === i;
          return (
            <RatingItem
              key={i}
              index={i}
              filled={filled}
              half={half}
              hovered={hovered}
              icon={icon}
              iconSize={iconSize}
              readOnly={readOnly}
              disabled={disabled}
              onClick={() => handleClick(i)}
              onMouseEnter={() => setHoverValue(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

Rating.displayName = "Rating";
