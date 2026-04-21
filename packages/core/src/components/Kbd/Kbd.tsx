import React from "react";

interface KbdProps {
  children: React.ReactNode;
  /** Size of the keyboard key badge */
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: { px: 5, py: 1, font: 10, radius: 5, min: 18 },
  md: { px: 7, py: 2, font: 11, radius: 6, min: 22 },
  lg: { px: 9, py: 4, font: 13, radius: 8, min: 28 },
};

export const Kbd: React.FC<KbdProps> = ({
  children,
  size = "md",
  className,
  style,
}) => {
  const s = sizeMap[size];

  return (
    <kbd
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: `${s.min}px`,
        minHeight: `${s.min}px`,
        padding: `${s.py}px ${s.px}px`,
        borderRadius: `${s.radius}px`,
        fontSize: `${s.font}px`,
        fontWeight: 800,
        fontFamily: "inherit",
        lineHeight: 1,
        color: "var(--neu-text-secondary)",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
        border: "1px solid var(--neu-border)",
        userSelect: "none",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...style,
      }}
    >
      {children}
    </kbd>
  );
};

Kbd.displayName = "Kbd";
