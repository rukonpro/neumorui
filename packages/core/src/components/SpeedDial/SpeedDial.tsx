import React from "react";

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

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions,
  icon = "+",
  className,
  style,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-end",
        ...style,
      }}
    >
      {/* Actions */}
      {open && (
        <div
          data-testid="speed-dial-actions"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: "8px",
            marginBottom: "8px",
            alignItems: "flex-end",
          }}
        >
          {actions.map((action, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition: `all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.04}s`,
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--neu-text-secondary)",
                  marginRight: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {action.label}
              </span>
              <button
                aria-label={action.label}
                onClick={() => {
                  action.onClick?.();
                  setOpen(false);
                }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  boxShadow: "var(--neu-shadow-raised)",
                  cursor: "pointer",
                  border: "none",
                  background: action.color || "var(--neu-bg)",
                  color: action.color ? "#fff" : "var(--neu-text-secondary)",
                  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
                }}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        aria-label="Toggle actions"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          border: "none",
          background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
          color: "#fff",
          boxShadow:
            "6px 6px 16px rgba(108,126,248,.5), -4px -4px 12px var(--neu-shadow-light)",
          cursor: "pointer",
          fontSize: "24px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {icon}
      </button>
    </div>
  );
};

SpeedDial.displayName = "SpeedDial";
