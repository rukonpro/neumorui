import React, { useState, useCallback, createContext, useContext } from "react";

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

type AlertDialogVariant = "default" | "success" | "danger" | "warning" | "info";

interface AlertDialogProps {
  /** Whether the dialog is visible */
  open?: boolean;
  /** Called when dialog closes */
  onClose?: () => void;
  /** Dialog title text */
  title?: string;
  /** Dialog message content */
  message: React.ReactNode;
  /** Color variant */
  variant?: AlertDialogVariant;
  /** Icon shown above the title */
  icon?: React.ReactNode;
  /** OK button label text */
  okText?: string;
  /** Cancel button label (shows cancel button if set) */
  cancelText?: string;
  /** Called when OK is clicked */
  onOk?: () => void;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const variantColors: Record<AlertDialogVariant, string> = {
  default: "var(--neu-accent)",
  success: "var(--neu-success)",
  danger: "var(--neu-danger)",
  warning: "var(--neu-warning)",
  info: "var(--neu-info)",
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open = false,
  onClose,
  title,
  message,
  variant = "default",
  icon,
  okText = "OK",
  cancelText,
  onOk,
  onCancel,
  className,
  style,
}) => {
  const [okHovered, setOkHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);
  const color = variantColors[variant];

  const handleOk = () => {
    onOk?.();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Enter") handleOk();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        role="presentation"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
          animation: "neuAlertFadeIn 0.15s ease",
        }}
      />

      {/* Dialog */}
      <div
        className={className}
        role="alertdialog"
        aria-modal="true"
        aria-label={title || "Alert"}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "380px",
          margin: "0 16px",
          padding: "28px 24px 20px",
          borderRadius: "22px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          textAlign: "center",
          animation: "neuAlertScaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          ...style,
        }}
      >
        {/* Icon */}
        {icon && (
          <div style={{ fontSize: "36px", marginBottom: "12px", lineHeight: 1 }}>
            {icon}
          </div>
        )}

        {/* Default variant icon */}
        {!icon && variant !== "default" && (
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: "22px",
              background: `${color}18`,
              color,
              boxShadow: "var(--neu-shadow-raised-sm)",
            }}
          >
            {variant === "success" && "✓"}
            {variant === "danger" && "!"}
            {variant === "warning" && "⚠"}
            {variant === "info" && "ℹ"}
          </div>
        )}

        {/* Title */}
        {title && (
          <div style={{ fontSize: "17px", fontWeight: 800, color: "var(--neu-text-primary)", marginBottom: "8px" }}>
            {title}
          </div>
        )}

        {/* Message */}
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--neu-text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
          {message}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {cancelText && (
            <button
              type="button"
              onClick={handleCancel}
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              style={{
                flex: 1,
                maxWidth: "140px",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "inherit",
                color: "var(--neu-text-secondary)",
                background: "var(--neu-bg)",
                boxShadow: cancelHovered ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
                transition,
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={handleOk}
            onMouseEnter={() => setOkHovered(true)}
            onMouseLeave={() => setOkHovered(false)}
            style={{
              flex: 1,
              maxWidth: cancelText ? "140px" : "180px",
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "inherit",
              color: "#fff",
              background: `linear-gradient(145deg, ${color}, ${color}cc)`,
              boxShadow: okHovered
                ? `4px 4px 12px ${color}50`
                : `3px 3px 8px ${color}30`,
              transform: okHovered ? "translateY(-2px)" : "none",
              transition,
            }}
          >
            {okText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes neuAlertFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuAlertScaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

AlertDialog.displayName = "AlertDialog";

// ── useAlertDialog hook — easy imperative usage ──

interface AlertOptions {
  title?: string;
  message: React.ReactNode;
  variant?: AlertDialogVariant;
  icon?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

interface AlertDialogContextValue {
  alert: (opts: AlertOptions) => void;
  confirm: (opts: AlertOptions) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

export const useAlertDialog = () => {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) throw new Error("useAlertDialog must be used inside <AlertDialogProvider>");
  return ctx;
};

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opts, setOpts] = useState<AlertOptions | null>(null);

  const alert = useCallback((o: AlertOptions) => {
    setOpts({ ...o, cancelText: undefined });
  }, []);

  const confirm = useCallback((o: AlertOptions) => {
    setOpts({ ...o, cancelText: o.cancelText || "Cancel" });
  }, []);

  const handleClose = () => setOpts(null);

  return (
    <AlertDialogContext.Provider value={{ alert, confirm }}>
      {children}
      <AlertDialog
        open={!!opts}
        onClose={handleClose}
        title={opts?.title}
        message={opts?.message || ""}
        variant={opts?.variant}
        icon={opts?.icon}
        okText={opts?.okText}
        cancelText={opts?.cancelText}
        onOk={() => { opts?.onOk?.(); handleClose(); }}
        onCancel={() => { opts?.onCancel?.(); handleClose(); }}
      />
    </AlertDialogContext.Provider>
  );
};

AlertDialogProvider.displayName = "AlertDialogProvider";
