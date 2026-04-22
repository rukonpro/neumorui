import React, { useRef, useCallback, useState } from "react";

interface RichTextEditorProps {
  /** HTML content value */
  value?: string;
  /** Called with updated HTML content */
  onChange?: (html: string) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Label text above the editor */
  label?: string;
  /** Minimum editor height in pixels */
  minHeight?: number;
  /** Disable editing */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

type ToolbarAction = { label: string; icon: string; command: string; value?: string };

const tools: ToolbarAction[] = [
  { label: "Bold", icon: "B", command: "bold" },
  { label: "Italic", icon: "I", command: "italic" },
  { label: "Underline", icon: "U", command: "underline" },
  { label: "Strike", icon: "S", command: "strikeThrough" },
  { label: "H1", icon: "H1", command: "formatBlock", value: "h1" },
  { label: "H2", icon: "H2", command: "formatBlock", value: "h2" },
  { label: "List", icon: "•", command: "insertUnorderedList" },
  { label: "Ordered", icon: "1.", command: "insertOrderedList" },
  { label: "Quote", icon: "❝", command: "formatBlock", value: "blockquote" },
  { label: "Code", icon: "<>", command: "formatBlock", value: "pre" },
  { label: "Link", icon: "🔗", command: "createLink" },
];

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({
  value,
  onChange,
  placeholder = "Start writing...",
  label,
  minHeight = 150,
  disabled,
  className,
  style,
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const execCommand = useCallback((command: string, value?: string) => {
    if (command === "createLink") {
      setLinkUrl("");
      setLinkModalOpen(true);
      return;
    } else if (value) {
      document.execCommand(command, false, value);
    } else {
      document.execCommand(command, false);
    }
    editorRef.current?.focus();
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleLinkSubmit = useCallback(() => {
    if (linkUrl.trim()) {
      document.execCommand("createLink", false, linkUrl.trim());
    }
    setLinkModalOpen(false);
    setLinkUrl("");
    editorRef.current?.focus();
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [linkUrl, onChange]);

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

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
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
            padding: "8px 10px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {tools.map((tool) => (
            <ToolbarButton key={tool.label} tool={tool} onClick={() => execCommand(tool.command, tool.value)} />
          ))}
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          role="textbox"
          aria-label={label || "Rich text editor"}
          aria-multiline="true"
          data-placeholder={placeholder}
          onInput={handleInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          dangerouslySetInnerHTML={value ? { __html: value } : undefined}
          style={{
            minHeight: `${minHeight}px`,
            padding: "14px 16px",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.7,
            color: "var(--neu-text-primary)",
            outline: "none",
            wordBreak: "break-word",
          }}
        />
      </div>

      {/* Link URL Modal */}
      {linkModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.18)",
            animation: "fadeIn 0.15s ease",
          }}
          onClick={() => setLinkModalOpen(false)}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--neu-bg)",
              borderRadius: "18px",
              padding: "22px 24px",
              boxShadow: "var(--neu-shadow-raised-lg)",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              animation: "neu-scale-in 0.2s ease",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)", margin: 0 }}>
              Enter URL
            </p>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLinkSubmit(); if (e.key === "Escape") setLinkModalOpen(false); }}
              placeholder="https://example.com"
              autoFocus
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "inherit",
                color: "var(--neu-text-primary)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-inset-sm)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  color: "var(--neu-text-secondary)",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  transition,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLinkSubmit}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  color: "#fff",
                  background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  transition,
                }}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        [data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: var(--neu-text-muted);
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
});

const ToolbarButton: React.FC<{ tool: ToolbarAction; onClick: () => void }> = ({ tool, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={tool.label}
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: tool.icon.length > 2 ? "11px" : "12px",
        fontWeight: 800,
        fontFamily: "inherit",
        color: "var(--neu-text-secondary)",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
        transition,
      }}
    >
      {tool.icon}
    </button>
  );
};

RichTextEditor.displayName = "RichTextEditor";
