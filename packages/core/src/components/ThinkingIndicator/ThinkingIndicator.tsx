import React from "react";

type ThinkingVariant = "dots" | "wave" | "pulse" | "typing";
type ThinkingSize = "sm" | "md" | "lg";

interface ThinkingIndicatorProps {
  /** Label text next to the animation */
  label?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Animation style variant */
  variant?: ThinkingVariant;
  /** Size preset */
  size?: ThinkingSize;
  /** Custom accent color override */
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: { dot: 6, gap: 4, font: 11, avatar: 24, pad: "6px 12px" },
  md: { dot: 8, gap: 5, font: 13, avatar: 32, pad: "8px 16px" },
  lg: { dot: 10, gap: 6, font: 15, avatar: 40, pad: "10px 20px" },
};

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  label,
  avatar,
  variant = "dots",
  size = "md",
  accentColor,
  className,
  style,
}) => {
  const s = sizeMap[size];
  const color = accentColor || "var(--neu-accent)";
  const animId = React.useId().replace(/:/g, "");

  const dotStyle = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: `${s.dot}px`,
      height: `${s.dot}px`,
      borderRadius: "50%",
      background: color,
      display: "inline-block",
    };

    switch (variant) {
      case "dots":
        return { ...base, animation: `neuThinkBounce-${animId} 1.4s ease-in-out ${i * 0.16}s infinite` };
      case "wave":
        return { ...base, animation: `neuThinkWave-${animId} 1.2s ease-in-out ${i * 0.15}s infinite` };
      case "pulse":
        return { ...base, animation: `neuThinkPulse-${animId} 1.4s ease-in-out ${i * 0.2}s infinite` };
      case "typing":
        return { ...base, animation: `neuThinkTyping-${animId} 1.4s ease-in-out ${i * 0.12}s infinite`, borderRadius: "2px", width: `${s.dot * 0.7}px`, height: `${s.dot * 1.4}px` };
    }
  };

  return (
    <div
      className={className}
      role="status"
      aria-label={label || "Loading"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${s.gap + 4}px`,
        padding: s.pad,
        borderRadius: "999px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
        ...style,
      }}
    >
      {avatar && (
        <img
          src={avatar}
          alt=""
          style={{
            width: `${s.avatar}px`,
            height: `${s.avatar}px`,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "var(--neu-shadow-inset-sm)",
          }}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: `${s.gap}px` }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={dotStyle(i)} />
        ))}
      </div>

      {label && (
        <span style={{ fontSize: `${s.font}px`, fontWeight: 600, color: "var(--neu-text-secondary)" }}>
          {label}
        </span>
      )}

      <style>{`
        @keyframes neuThinkBounce-${animId} {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-${s.dot}px); opacity: 1; }
        }
        @keyframes neuThinkWave-${animId} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${s.dot * 1.5}px); }
        }
        @keyframes neuThinkPulse-${animId} {
          0%, 100% { transform: scale(0.6); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes neuThinkTyping-${animId} {
          0%, 100% { transform: scaleY(0.5); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

ThinkingIndicator.displayName = "ThinkingIndicator";
