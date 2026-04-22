import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ConfirmDialogInput {
  placeholder?: string;
  matchValue?: string;
}

interface ConfirmDialogProps {
  /** Whether the dialog is visible */
  open: boolean;
  /** Callback when visibility changes */
  onOpenChange: (open: boolean) => void;
  /** Dialog heading text */
  title: string;
  /** Explanatory text below the title */
  description?: string;
  /** Icon displayed before the title */
  icon?: string;
  /** Visual style: default or danger */
  variant?: "default" | "danger";
  /** Text for the confirm button */
  confirmLabel?: string;
  /** Text for the cancel button */
  cancelLabel?: string;
  /** Callback when user confirms */
  onConfirm: () => void;
  /** Callback when user cancels */
  onCancel?: () => void;
  /** Optional confirmation text input config */
  input?: ConfirmDialogInput;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  icon,
  variant = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  input,
  className,
  style,
  ...rest
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const isDanger = variant === "danger";

  const canConfirm = input?.matchValue ? inputValue === input.matchValue : true;

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel?.();
        onOpenChange(false);
        setInputValue("");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCancel, onOpenChange]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
    setInputValue("");
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
    onOpenChange(false);
    setInputValue("");
  };

  const dialog = (
    <>
      {/* Backdrop */}
      <div
        onClick={handleCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "neuConfirmFadeIn 0.2s ease",
        }}
      />

      {/* Dialog */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
          pointerEvents: "none",
        }}
      >
        <div
          className={className}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="neu-confirm-title"
          aria-describedby={description ? "neu-confirm-desc" : undefined}
          style={{
            width: "100%",
            maxWidth: "380px",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "var(--neu-shadow-raised-lg)",
            background: "var(--neu-bg)",
            pointerEvents: "auto",
            animation: "neuConfirmSlideIn 0.25s cubic-bezier(0.34, 1.4, 0.64, 1)",
            ...style,
          }}
          data-testid="confirm-dialog"
          {...rest}
        >
          <p
            id="neu-confirm-title"
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: isDanger ? "var(--neu-danger)" : "var(--neu-text-primary)",
              marginBottom: "6px",
            }}
          >
            {icon && <span style={{ marginRight: "6px" }}>{icon}</span>}
            {title}
          </p>
          {description && (
            <p
              id="neu-confirm-desc"
              style={{
                fontSize: "13px",
                color: "var(--neu-text-secondary)",
                marginBottom: "16px",
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          )}
          {input && (
            <div style={{ marginBottom: "14px" }}>
              <input
                data-testid="confirm-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={input.placeholder}
                autoFocus
                style={{
                  width: "100%",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--neu-text-primary)",
                  background: "var(--neu-bg)",
                  border: "none",
                  outline: "none",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  boxShadow: "var(--neu-shadow-inset)",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleCancel}
              data-testid="confirm-cancel-btn"
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "13px",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "12px",
                background: "var(--neu-bg)",
                color: "var(--neu-text-primary)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                transition,
              }}
            >
              {cancelLabel}
            </button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              data-testid="confirm-confirm-btn"
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "13px",
                padding: "10px",
                border: "none",
                cursor: canConfirm ? "pointer" : "not-allowed",
                borderRadius: "12px",
                color: "#fff",
                background: isDanger
                  ? "linear-gradient(145deg, #fa9080, #f5604a)"
                  : "linear-gradient(145deg, #8490fa, #5a6cf5)",
                boxShadow: isDanger
                  ? "5px 5px 14px rgba(248,124,108,.4), -3px -3px 10px var(--neu-shadow-light)"
                  : "5px 5px 14px rgba(108,126,248,.45), -3px -3px 10px var(--neu-shadow-light)",
                opacity: canConfirm ? 1 : 0.5,
                transition,
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes neuConfirmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes neuConfirmSlideIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );

  if (typeof document !== "undefined") {
    return createPortal(dialog, document.body);
  }
  return dialog;
};

ConfirmDialog.displayName = "ConfirmDialog";
