import React, { useState, useCallback } from "react";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
  label?: string;
  minHeight?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

function markdownToHtml(md: string): string {
  let html = md;
  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // Bold / Italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code
  html = html.replace(/`(.+?)`/g, '<code style="padding:2px 6px;border-radius:4px;background:rgba(108,126,248,0.1);font-size:12px;font-weight:600">$1</code>');
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--neu-accent);font-weight:600">$1</a>');
  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul style="padding-left:20px;margin:4px 0">${m}</ul>`);
  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--neu-accent);padding-left:12px;margin:8px 0;color:var(--neu-text-secondary);font-style:italic">$1</blockquote>');
  // Line breaks
  html = html.replace(/\n\n/g, "<br/><br/>");
  html = html.replace(/\n/g, "<br/>");
  return html;
}

export const MarkdownEditor = React.forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({
  value: controlledValue,
  onChange,
  placeholder = "Write markdown here...",
  label,
  minHeight = 180,
  disabled,
  className,
  style,
}, ref) => {
  const [internal, setInternal] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [focused, setFocused] = useState(false);

  const text = controlledValue ?? internal;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) setInternal(val);
    onChange?.(val);
  }, [controlledValue, onChange]);

  const preview = markdownToHtml(text);

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%", ...style }}>
      {label && (
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neu-text-secondary)" }}>
          {label}
        </label>
      )}

      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "var(--neu-bg)",
          boxShadow: focused
            ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
            : "var(--neu-shadow-inset)",
          transition: "box-shadow 0.2s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 800,
                fontFamily: "inherit",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: tab === t ? "var(--neu-accent)" : "var(--neu-text-muted)",
                background: tab === t ? "rgba(108,126,248,0.06)" : "transparent",
                borderBottom: tab === t ? "2px solid var(--neu-accent)" : "2px solid transparent",
                transition,
              }}
            >
              {t === "write" ? "✏️ Write" : "👁️ Preview"}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "write" ? (
          <textarea
            value={text}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%",
              minHeight: `${minHeight}px`,
              padding: "14px 16px",
              border: "none",
              outline: "none",
              resize: "vertical",
              fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--neu-text-primary)",
              background: "transparent",
            }}
          />
        ) : (
          <div
            style={{
              minHeight: `${minHeight}px`,
              padding: "14px 16px",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--neu-text-primary)",
            }}
            dangerouslySetInnerHTML={{ __html: preview || '<span style="color:var(--neu-text-muted);opacity:0.6">Nothing to preview</span>' }}
          />
        )}
      </div>
    </div>
  );
});

MarkdownEditor.displayName = "MarkdownEditor";
