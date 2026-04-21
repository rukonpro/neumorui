"use client";

import React, { useState } from "react";
import type { PropDef } from "@/data/components";
import { CodeBlock } from "@/components/CodeBlock";

interface PropsPlaygroundProps {
  props: PropDef[];
  preview: React.ReactNode;
  code: string;
  component?: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const PropsPlayground: React.FC<PropsPlaygroundProps> = ({ props, preview, code, component: Component, defaultProps = {} }) => {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [expanded, setExpanded] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const editableProps = props.filter((p) => {
    const t = p.type.toLowerCase();
    return (
      t === "boolean" ||
      t === "string" ||
      t === "number" ||
      t.startsWith('"') // enum like '"sm" | "md" | "lg"'
    );
  });

  if (editableProps.length === 0) return null;

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setValues({});

  const parseEnumOptions = (type: string): string[] => {
    return type
      .split("|")
      .map((s) => s.trim().replace(/"/g, ""))
      .filter(Boolean);
  };

  const activeProps = Object.fromEntries(
    Object.entries(values).filter(([, v]) => v !== undefined)
  );

  const hasChanges = Object.keys(activeProps).length > 0;

  // Merge default props with playground-changed props
  const mergedProps = { ...defaultProps, ...activeProps };

  return (
    <div
      style={{
        borderRadius: "22px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-lg)",
      }}
    >
      {/* Demo preview */}
      <div
        style={{
          padding: "32px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "140px",
          borderBottom: hasChanges ? "none" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ width: "100%" }}>
          {preview}
        </div>
      </div>

      {/* Live playground preview — shows only when props changed */}
      {hasChanges && Component && (
        <div
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80px",
            borderTop: "1px dashed rgba(108,126,248,0.2)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            background: "rgba(108,126,248,0.02)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%" }}>
            <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--neu-accent)", opacity: 0.6 }}>
              Live Preview
            </span>
            <Component {...mergedProps} />
          </div>
        </div>
      )}

      {/* Playground controls */}
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            padding: "12px 18px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--neu-accent)",
          }}
        >
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Playground — Edit Props Live
          {hasChanges && (
            <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "4px", background: "rgba(108,126,248,0.12)", color: "var(--neu-accent)", fontWeight: 800, marginLeft: "4px" }}>
              {Object.keys(activeProps).length} changed
            </span>
          )}
        </button>

        {expanded && (
          <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {editableProps.map((prop) => {
              const t = prop.type.toLowerCase();

              if (t === "boolean") {
                return (
                  <PlaygroundRow key={prop.name} label={prop.name}>
                    <ToggleSwitch
                      checked={!!values[prop.name]}
                      onChange={(v) => handleChange(prop.name, v)}
                    />
                  </PlaygroundRow>
                );
              }

              if (t === "number") {
                return (
                  <PlaygroundRow key={prop.name} label={prop.name}>
                    <input
                      type="number"
                      value={values[prop.name] !== undefined ? Number(values[prop.name]) : ""}
                      placeholder={prop.default}
                      onChange={(e) => handleChange(prop.name, e.target.value ? Number(e.target.value) : undefined)}
                      style={inputStyle}
                    />
                  </PlaygroundRow>
                );
              }

              if (prop.type.includes('"')) {
                const options = parseEnumOptions(prop.type);
                return (
                  <PlaygroundRow key={prop.name} label={prop.name}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {options.map((opt) => {
                        const isActive = values[prop.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange(prop.name, isActive ? undefined : opt)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: "8px",
                              border: "none",
                              outline: "none",
                              cursor: "pointer",
                              fontSize: "11px",
                              fontWeight: 700,
                              fontFamily: "inherit",
                              color: isActive ? "var(--neu-accent)" : "var(--neu-text-muted)",
                              background: "var(--neu-bg)",
                              boxShadow: isActive ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
                              transition,
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </PlaygroundRow>
                );
              }

              if (t === "string") {
                return (
                  <PlaygroundRow key={prop.name} label={prop.name}>
                    <input
                      type="text"
                      value={String(values[prop.name] ?? "")}
                      placeholder={prop.default}
                      onChange={(e) => handleChange(prop.name, e.target.value || undefined)}
                      style={inputStyle}
                    />
                  </PlaygroundRow>
                );
              }

              return null;
            })}

            {/* Reset button */}
            {hasChanges && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  alignSelf: "flex-end",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--neu-text-muted)",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  transition,
                }}
              >
                Reset
              </button>
            )}
          </div>
        )}
      </div>

      {/* Code toggle */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
            padding: "10px 20px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "inherit",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--neu-text-muted)",
            transition: "color 0.2s ease",
          }}
        >
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{ transform: showCode ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {showCode ? "Hide code" : "Show code"}
        </button>
        {showCode && (
          <div style={{ padding: "0 16px 16px" }}>
            <CodeBlock code={code} />
          </div>
        )}
      </div>
    </div>
  );
};

const PlaygroundRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
    <span style={{ fontSize: "12px", fontWeight: 700, fontFamily: "'SF Mono', 'Fira Code', monospace", color: "var(--neu-text-secondary)", minWidth: "80px" }}>
      {label}
    </span>
    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>{children}</div>
  </div>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    style={{
      width: "38px",
      height: "22px",
      borderRadius: "11px",
      border: "none",
      outline: "none",
      cursor: "pointer",
      position: "relative",
      background: checked ? "var(--neu-accent)" : "var(--neu-bg)",
      boxShadow: checked ? "inset 2px 2px 4px rgba(0,0,0,0.2)" : "var(--neu-shadow-inset-sm)",
      transition,
    }}
    aria-label="Toggle"
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
        position: "absolute",
        top: "3px",
        left: checked ? "19px" : "3px",
        transition,
      }}
    />
  </button>
);

const inputStyle: React.CSSProperties = {
  width: "120px",
  padding: "6px 10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "12px",
  fontWeight: 600,
  fontFamily: "inherit",
  color: "var(--neu-text-primary)",
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-inset-sm)",
  textAlign: "right",
};
