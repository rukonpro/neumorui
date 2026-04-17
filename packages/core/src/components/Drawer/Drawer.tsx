import React from "react";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  title?: string;
  children: React.ReactNode;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 40,
  background: "rgba(0,0,0,.25)",
  backdropFilter: "blur(4px)",
  animation: "fadeIn 0.2s ease",
};

const basePanelStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 50,
  padding: "1.5rem",
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-raised-lg)",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const sidePanelStyles: Record<string, React.CSSProperties> = {
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "280px",
    borderRadius: "0 20px 20px 0",
    animation: "slideInLeft 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: "280px",
    borderRadius: "20px 0 0 20px",
    animation: "slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  bottom: {
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "24px 24px 0 0",
    animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};

const closeButtonStyle: React.CSSProperties = {
  border: "none",
  background: "none",
  fontSize: "20px",
  color: "var(--neu-text-muted)",
  cursor: "pointer",
  padding: "4px",
  lineHeight: 1,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
};

const dragHandleStyle: React.CSSProperties = {
  width: "40px",
  height: "4px",
  borderRadius: "999px",
  background: "var(--neu-text-muted)",
  opacity: 0.4,
  margin: "0 auto 12px",
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  side = "right",
  title,
  children,
}) => {
  if (!open) return null;

  return (
    <>
      <div
        style={overlayStyle}
        onClick={() => onOpenChange(false)}
        data-testid="drawer-overlay"
      />
      <div
        role="dialog"
        style={{ ...basePanelStyle, ...sidePanelStyles[side] }}
        data-testid="drawer-panel"
      >
        {side === "bottom" && <div style={dragHandleStyle} />}
        <div style={headerStyle}>
          {title && (
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--neu-text-primary)",
              }}
            >
              {title}
            </span>
          )}
          <button
            onClick={() => onOpenChange(false)}
            style={closeButtonStyle}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </div>
    </>
  );
};

Drawer.displayName = "Drawer";
