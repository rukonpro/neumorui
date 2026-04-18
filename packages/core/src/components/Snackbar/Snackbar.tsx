import React, { createContext, useCallback, useContext, useState } from "react";

type SnackbarVariant = "default" | "success" | "danger" | "warning" | "info";

interface SnackbarItem {
  id: string;
  message: string;
  variant?: SnackbarVariant;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface SnackbarContextValue {
  snackbar: (opts: Omit<SnackbarItem, "id">) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return ctx;
};

const variantColors: Record<SnackbarVariant, string> = {
  default: "var(--neu-text-primary)",
  success: "var(--neu-success)",
  danger: "var(--neu-danger)",
  warning: "var(--neu-warning)",
  info: "var(--neu-info)",
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SnackbarItem[]>([]);

  const snackbar = useCallback((opts: Omit<SnackbarItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, ...opts }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((s) => s.id !== id));
    }, opts.duration ?? 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbar }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 60,
          pointerEvents: "none",
          maxWidth: "min(460px, calc(100vw - 32px))",
          width: "100%",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "16px",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-lg)",
              borderLeft: item.variant && item.variant !== "default" ? `3px solid ${variantColors[item.variant]}` : undefined,
              animation: "neuSnackIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--neu-text-primary)",
              }}
            >
              {item.message}
            </span>

            {item.action && (
              <button
                type="button"
                onClick={() => { item.action!.onClick(); dismiss(item.id); }}
                style={{
                  padding: "5px 12px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 800,
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--neu-accent)",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                {item.action.label}
              </button>
            )}

            <button
              type="button"
              onClick={() => dismiss(item.id)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "7px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--neu-text-muted)",
                background: "transparent",
                flexShrink: 0,
                transition: "all 0.15s ease",
              }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes neuSnackIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.displayName = "SnackbarProvider";
