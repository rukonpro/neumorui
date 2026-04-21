import React, { useState } from "react";

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

interface PromptCardProps {
  /** Icon displayed at the top */
  icon?: React.ReactNode;
  /** Card title text */
  title: string;
  /** Short description below the title */
  description?: string;
  /** Category badge text */
  category?: string;
  /** The prompt text sent on click */
  prompt: string;
  /** Called with the prompt text on click */
  onClick?: (prompt: string) => void;
  /** Disable interaction */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  icon,
  title,
  description,
  category,
  prompt,
  onClick,
  disabled,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) onClick?.(prompt);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        padding: "16px",
        borderRadius: "16px",
        border: "none",
        outline: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        width: "100%",
        fontFamily: "inherit",
        background: "var(--neu-bg)",
        boxShadow: hovered && !disabled ? "var(--neu-shadow-raised)" : "var(--neu-shadow-raised-sm)",
        transform: hovered && !disabled ? "translateY(-3px)" : "none",
        opacity: disabled ? 0.5 : 1,
        transition,
        ...style,
      }}
    >
      {(icon || category) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
          {category && (
            <span style={{
              fontSize: "9px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(108,126,248,0.1)",
              color: "var(--neu-accent)",
            }}>
              {category}
            </span>
          )}
        </div>
      )}
      <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)", lineHeight: 1.4 }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--neu-text-muted)", lineHeight: 1.5 }}>
          {description}
        </div>
      )}
    </button>
  );
};

PromptCard.displayName = "PromptCard";

// PromptGrid companion
interface PromptGridProps {
  /** Array of prompt card data */
  prompts: Omit<PromptCardProps, "onClick">[];
  /** Called when a prompt card is selected */
  onSelect: (prompt: string) => void;
  /** Number of grid columns */
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  style?: React.CSSProperties;
}

export const PromptGrid: React.FC<PromptGridProps> = ({
  prompts,
  onSelect,
  columns = 2,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "12px",
        ...style,
      }}
    >
      {prompts.map((p, i) => (
        <PromptCard key={i} {...p} onClick={onSelect} />
      ))}
    </div>
  );
};

PromptGrid.displayName = "PromptGrid";
