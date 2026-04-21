"use client";

import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  preview: React.ReactNode;
  code: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ preview, code }) => {
  const [showCode, setShowCode] = useState(true);

  return (
    <div
      style={{
        borderRadius: "24px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-lg)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Preview area */}
      <div
        style={{
          padding: "32px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "140px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ width: "100%" }}>
          {preview}
        </div>
      </div>

      {/* Toggle + Code */}
      <div style={{ padding: "0" }}>
        <button
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
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transform: showCode ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
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
