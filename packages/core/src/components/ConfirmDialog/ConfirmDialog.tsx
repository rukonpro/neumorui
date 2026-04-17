import React from "react";

interface ConfirmDialogInput {
  placeholder?: string;
  matchValue?: string;
}

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: string;
  variant?: "default" | "danger";
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
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
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const isDanger = variant === "danger";

  const canConfirm = input?.matchValue ? inputValue === input.matchValue : true;

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

  return (
    <div
      className={className}
      style={{
        padding: "14px",
        borderRadius: "16px",
        boxShadow: "var(--neu-shadow-raised)",
        background: "var(--neu-bg)",
        ...style,
      }}
      data-testid="confirm-dialog"
    >
      <p
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: isDanger ? "var(--neu-danger)" : "var(--neu-text-primary)",
          marginBottom: "6px",
        }}
      >
        {icon && <span style={{ marginRight: "4px" }}>{icon}</span>}
        {title}
      </p>
      {description && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--neu-text-secondary)",
            marginBottom: "12px",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}
      {input && (
        <div style={{ marginBottom: "10px" }}>
          <input
            data-testid="confirm-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={input.placeholder}
            style={{
              width: "100%",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--neu-text-primary)",
              background: "var(--neu-bg)",
              border: "none",
              outline: "none",
              borderRadius: "10px",
              padding: "9px 12px",
              boxShadow: "var(--neu-shadow-inset)",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}
      <div style={{ display: "flex", gap: "8px" }}>
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
            fontSize: "12px",
            padding: "9px",
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
            fontSize: "12px",
            padding: "9px",
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
  );
};

ConfirmDialog.displayName = "ConfirmDialog";
