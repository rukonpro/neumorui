/* Server-renderable code block for guide pages (CodeBlock from neumorui is client-only). */

interface GuideCodeBlockProps {
  language?: string;
  code: string;
}

export function GuideCodeBlock({ language, code }: GuideCodeBlockProps) {
  return (
    <div
      style={{
        position: "relative",
        margin: "12px 0",
        borderRadius: "14px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset-sm)",
        padding: "16px 18px",
        overflowX: "auto",
      }}
    >
      {language && (
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--neu-text-muted)",
          }}
        >
          {language}
        </span>
      )}
      <pre
        style={{
          margin: 0,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--neu-text-primary)",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
