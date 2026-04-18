import React, { useState, useCallback } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  maxHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
  showCopyButton = true,
  maxHeight,
  className,
  style,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const lines = code.split("\n");

  return (
    <div
      className={className}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset)",
        ...style,
      }}
    >
      {/* Header */}
      {(title || showCopyButton) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {title && (
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>
                {title}
              </span>
            )}
            <span
              style={{
                fontSize: "9px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(108,126,248,0.1)",
                color: "var(--neu-accent)",
              }}
            >
              {language}
            </span>
          </div>
          {showCopyButton && (
            <CopyBtn copied={copied} onClick={handleCopy} />
          )}
        </div>
      )}

      {/* Code */}
      <div
        style={{
          overflowX: "auto",
          overflowY: maxHeight ? "auto" : "visible",
          maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          padding: "14px 0",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace" }}>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i}>
                {showLineNumbers && (
                  <td
                    style={{
                      textAlign: "right",
                      padding: "1px 14px 1px 16px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--neu-text-muted)",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                      opacity: 0.5,
                    }}
                  >
                    {i + 1}
                  </td>
                )}
                <td
                  style={{
                    padding: "1px 16px 1px 0",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--neu-text-primary)",
                    whiteSpace: "pre",
                    lineHeight: 1.7,
                  }}
                >
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CopyBtn: React.FC<{ copied: boolean; onClick: () => void }> = ({ copied, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontSize: "11px",
        fontWeight: 700,
        fontFamily: "inherit",
        color: copied ? "var(--neu-success)" : "var(--neu-text-muted)",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
        transition,
      }}
    >
      {copied ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

CodeBlock.displayName = "CodeBlock";
