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
  default: { background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-lg)" },
  success: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-lg)",
    borderLeft: "3px solid var(--neu-success)",
  },
  danger: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-lg)",
    borderLeft: "3px solid var(--neu-danger)",
  },
  warning: {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-raised-lg)",
    borderLeft: "3px solid var(--neu-warning)",
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
        {toasts.map((t) => (
          <div
            key={t.id}
            className="neu-slide-down pointer-events-auto min-w-72 max-w-sm p-4 rounded-neu-lg"
            style={variantStyle[t.variant ?? "default"]}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--neu-text-primary)" }}
            >
              {t.message}
            </p>
            {t.description && (
              <p className="text-xs mt-1" style={{ color: "var(--neu-text-secondary)" }}>
                {t.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
