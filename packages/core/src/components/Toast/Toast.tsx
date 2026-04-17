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
      <div className="fixed top-4 right-4 flex flex-col gap-3 z-50 pointer-events-none">
        {toasts.map((t) => {
          const variant = t.variant ?? "default";
          const isTinted = variant !== "default";
          return (
            <div
              key={t.id}
              className="neu-slide-down pointer-events-auto min-w-72 max-w-sm rounded-[16px]"
              style={{ padding: "12px 14px", ...variantStyle[variant] }}
            >
              <p
                className="text-sm font-bold"
                style={{ color: isTinted ? "inherit" : "var(--neu-text-primary)" }}
              >
                {t.message}
              </p>
              {t.description && (
                <p
                  className="text-xs mt-1"
                  style={{
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
