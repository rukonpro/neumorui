import React, { useState } from "react";

export interface SpeedDialAction {
  label: string;
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

interface SpeedDialProps {
  actions: SpeedDialAction[];
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const ActionItem: React.FC<{
  action: SpeedDialAction;
  index: number;
  total: number;
  open: boolean;
  onSelect: () => void;
}> = ({ action, index, total, open, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const delay = (total - 1 - index) * 0.06;

  const btnStyle: React.CSSProperties = {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    background: action.color || "var(--neu-bg)",
    color: action.color ? "#fff" : "var(--neu-text-secondary)",
    boxShadow: pressed
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised-lg)"
        : "var(--neu-shadow-raised)",
    transform: pressed
      ? "scale(0.92)"
      : hovered
        ? "translateY(-2px) scale(1.05)"
        : "none",
    transition,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        opacity: open ? 1 : 0,
        transform: open
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.5)",
        transition: `all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* Label chip */}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: hovered ? "var(--neu-accent)" : "var(--neu-text-secondary)",
          padding: "5px 12px",
          borderRadius: "10px",
          background: "var(--neu-bg)",
          boxShadow: hovered ? "var(--neu-shadow-raised-sm)" : "none",
          whiteSpace: "nowrap",
          transition,
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(20px)",
          transitionDelay: open ? `${delay + 0.05}s` : "0s",
        }}
      >
        {action.label}
      </span>

      {/* Action button */}
      <button
        aria-label={action.label}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={btnStyle}
      >
        {action.icon}
      </button>
    </div>
  );
};

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions,
  icon = "+",
  className,
  style,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [fabHovered, setFabHovered] = useState(false);
  const [fabPressed, setFabPressed] = useState(false);

  const fabStyle: React.CSSProperties = {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "26px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: open
      ? "rotate(45deg)"
      : fabPressed
        ? "scale(0.92)"
        : fabHovered
          ? "translateY(-3px) scale(1.05)"
          : "none",
    boxShadow: fabPressed
      ? "inset 4px 4px 10px rgba(60,78,200,.4), inset -3px -3px 8px rgba(255,255,255,.2)"
      : fabHovered
        ? "8px 8px 20px rgba(108,126,248,.55), -5px -5px 14px var(--neu-shadow-light)"
        : "6px 6px 16px rgba(108,126,248,.5), -4px -4px 12px var(--neu-shadow-light)",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-end",
        ...style,
      }}
      {...rest}
    >
      {/* Actions */}
      <div
        data-testid="speed-dial-actions"
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "10px",
          marginBottom: open ? "12px" : "0",
          alignItems: "flex-end",
          transition: "margin 0.3s ease",
        }}
      >
        {actions.map((action, i) => (
          <ActionItem
            key={i}
            action={action}
            index={i}
            total={actions.length}
            open={open}
            onSelect={() => {
              action.onClick?.();
              setOpen(false);
            }}
          />
        ))}
      </div>

      {/* Main FAB */}
      <button
        aria-label="Toggle actions"
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setFabHovered(true)}
        onMouseLeave={() => { setFabHovered(false); setFabPressed(false); }}
        onMouseDown={() => setFabPressed(true)}
        onMouseUp={() => setFabPressed(false)}
        style={fabStyle}
      >
        {icon}
      </button>
    </div>
  );
};

SpeedDial.displayName = "SpeedDial";
