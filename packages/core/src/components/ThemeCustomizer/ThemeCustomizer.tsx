import React, { useState, useCallback } from "react";

interface ThemeCustomizerProps {
  onThemeChange?: (vars: Record<string, string>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: "fixed" | "inline";
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

const defaultColors = [
  { label: "Accent", variable: "--neu-accent", value: "#7c6ff7" },
  { label: "Success", variable: "--neu-success", value: "#5bbf8a" },
  { label: "Danger", variable: "--neu-danger", value: "#e07070" },
  { label: "Warning", variable: "--neu-warning", value: "#e8b84b" },
  { label: "Background", variable: "--neu-bg", value: "#e8e8f0" },
];

const radiusOptions = ["8px", "12px", "16px", "20px", "24px"];

const presets = [
  { name: "Violet", accent: "#7c6ff7" },
  { name: "Blue", accent: "#5b9ee0" },
  { name: "Teal", accent: "#4dbfa0" },
  { name: "Rose", accent: "#e07090" },
  { name: "Amber", accent: "#e8a84b" },
  { name: "Emerald", accent: "#34d399" },
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  onThemeChange,
  open: controlledOpen,
  onOpenChange,
  position = "fixed",
  className,
  style,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>({});
  const [radius, setRadius] = useState("12px");

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((v: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(v);
    onOpenChange?.(v);
  }, [controlledOpen, onOpenChange]);

  const applyVar = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
    const next = { ...colors, [variable]: value };
    setColors(next);
    onThemeChange?.(next);
  };

  const applyPreset = (accent: string) => {
    applyVar("--neu-accent", accent);
  };

  const applyRadius = (r: string) => {
    setRadius(r);
    document.documentElement.style.setProperty("--neu-radius-md", r);
    applyVar("--neu-radius-md", r);
  };

  const isFixed = position === "fixed";

  return (
    <div
      className={className}
      style={{
        ...(isFixed ? { position: "fixed", top: "16px", right: "16px", zIndex: 60 } : {}),
        ...style,
      }}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: isFixed ? "10px" : "10px 16px",
          borderRadius: "14px",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: isFixed ? "18px" : "13px",
          fontWeight: 700,
          fontFamily: "inherit",
          color: "var(--neu-text-secondary)",
          background: "var(--neu-bg)",
          boxShadow: isOpen ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
          transition,
        }}
        aria-label="Customize theme"
      >
        🎨{!isFixed && (isOpen ? " Close Customizer" : " Theme Customizer")}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          style={{
            ...(isFixed
              ? { position: "absolute", top: "calc(100% + 8px)", right: 0 }
              : { marginTop: "12px" }),
            width: "280px",
            maxWidth: "calc(100vw - 32px)",
            padding: "18px",
            borderRadius: "20px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            animation: "neuTcIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--neu-text-primary)", marginBottom: "14px" }}>
            Theme Customizer
          </div>

          {/* Presets */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--neu-text-muted)", marginBottom: "8px" }}>
              Presets
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPreset(p.accent)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    border: "3px solid var(--neu-bg)",
                    outline: "none",
                    cursor: "pointer",
                    background: p.accent,
                    boxShadow: "var(--neu-shadow-raised-sm)",
                    transition,
                  }}
                  aria-label={p.name}
                  title={p.name}
                />
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--neu-text-muted)", marginBottom: "8px" }}>
              Colors
            </div>
            {defaultColors.map((c) => (
              <div key={c.variable} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>{c.label}</span>
                <input
                  type="color"
                  value={colors[c.variable] || c.value}
                  onChange={(e) => applyVar(c.variable, e.target.value)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: "var(--neu-bg)",
                    boxShadow: "var(--neu-shadow-raised-sm)",
                    padding: "2px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Radius */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--neu-text-muted)", marginBottom: "8px" }}>
              Border Radius
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {radiusOptions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => applyRadius(r)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    color: radius === r ? "var(--neu-accent)" : "var(--neu-text-muted)",
                    background: "var(--neu-bg)",
                    boxShadow: radius === r ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
                    transition,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes neuTcIn { from { opacity: 0; transform: translateY(-6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </div>
  );
};

ThemeCustomizer.displayName = "ThemeCustomizer";
