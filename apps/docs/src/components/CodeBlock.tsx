"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset)",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--neu-text-muted)",
          }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "inherit",
            color: copied ? "var(--neu-tint-success-text, #1f8a5e)" : "var(--neu-text-secondary)",
            background: copied ? "var(--neu-tint-success, #d4f3e8)" : "var(--neu-bg)",
            boxShadow: copied ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8 4V2.5A1.5 1.5 0 006.5 1H2.5A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre
        style={{
          padding: "16px",
          margin: 0,
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--neu-text-primary)",
          overflowX: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
