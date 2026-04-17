import React, { createContext, useCallback, useContext, useState } from "react";

type ToastVariant = "default" | "success" | "danger" | "warning";

interface ToastItem {
  id: string;
  message: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

const variantStyle: Record<ToastVariant, React.CSSProperties> = {
  default: { background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)" },
  success: {
    background: "var(--neu-tint-success)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    color: "var(--neu-tint-success-text)",
  },
  danger: {
    background: "var(--neu-tint-danger)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    color: "var(--neu-tint-danger-text)",
  },
  warning: {
    background: "var(--neu-tint-warning)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    color: "var(--neu-tint-warning-text)",
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((opts: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...opts }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, opts.duration ?? 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => {
          const variant = t.variant ?? "default";
          const isTinted = variant !== "default";
          return (
            <div
              key={t.id}
              style={{
                pointerEvents: "auto",
                minWidth: "280px",
                maxWidth: "380px",
                padding: "12px 14px",
                borderRadius: "16px",
                animation: "fadeUp 0.3s ease",
                ...variantStyle[variant],
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  margin: 0,
                  color: isTinted ? "inherit" : "var(--neu-text-primary)",
                }}
              >
                {t.message}
              </p>
              {t.description && (
                <p
                  style={{
                    fontSize: "12px",
                    margin: "3px 0 0",
                    color: isTinted ? "inherit" : "var(--neu-text-secondary)",
                    opacity: isTinted ? 0.85 : 1,
                  }}
                >
                  {t.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
