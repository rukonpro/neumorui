"use client";

import React, { useState, useMemo } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple syntax highlighting — no external deps
function highlightCode(code: string): React.ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIdx) => {
    const tokens = tokenizeLine(line);
    return (
      <div key={lineIdx} style={{ display: "flex", minHeight: "20px" }}>
        <span
          style={{
            width: "36px",
            flexShrink: 0,
            textAlign: "right",
            paddingRight: "16px",
            color: "rgba(255,255,255,0.2)",
            userSelect: "none",
          }}
        >
          {lineIdx + 1}
        </span>
        <span style={{ flex: 1 }}>
          {tokens.map((token, i) => (
            <span key={i} style={{ color: token.color }}>
              {token.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

interface Token {
  text: string;
  color: string;
}

const COLORS = {
  keyword: "#c792ea",    // purple — import, export, const, function, return, etc.
  component: "#ffcb6b",  // yellow — <ComponentName>
  string: "#c3e88d",     // green — "strings"
  comment: "#546e7a",    // gray — // comments
  tag: "#f07178",        // red — HTML tags, JSX
  attr: "#82aaff",       // blue — prop names
  punct: "#89ddff",      // cyan — brackets, =, =>
  number: "#f78c6c",     // orange — numbers
  type: "#ffcb6b",       // yellow — type names
  default: "#d6deeb",    // white — default text
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let matched = false;

    // Comments
    if (remaining.startsWith("//") || remaining.startsWith("/*")) {
      tokens.push({ text: remaining, color: COLORS.comment });
      return tokens;
    }

    // Strings (double quotes)
    const dq = remaining.match(/^"([^"\\]|\\.)*"/);
    if (dq) {
      tokens.push({ text: dq[0], color: COLORS.string });
      remaining = remaining.slice(dq[0].length);
      matched = true;
      continue;
    }

    // Strings (single quotes)
    const sq = remaining.match(/^'([^'\\]|\\.)*'/);
    if (sq) {
      tokens.push({ text: sq[0], color: COLORS.string });
      remaining = remaining.slice(sq[0].length);
      matched = true;
      continue;
    }

    // Template literals
    const tl = remaining.match(/^`([^`\\]|\\.)*`/);
    if (tl) {
      tokens.push({ text: tl[0], color: COLORS.string });
      remaining = remaining.slice(tl[0].length);
      matched = true;
      continue;
    }

    // JSX components <ComponentName or </ComponentName
    const jsx = remaining.match(/^<\/?([A-Z][A-Za-z0-9.]*)/);
    if (jsx) {
      const bracket = remaining[0] === "<" && remaining[1] === "/" ? "</" : "<";
      tokens.push({ text: bracket, color: COLORS.punct });
      tokens.push({ text: jsx[1], color: COLORS.component });
      remaining = remaining.slice(jsx[0].length);
      matched = true;
      continue;
    }

    // HTML tags <div, </div, etc
    const htmlTag = remaining.match(/^<\/?([a-z][a-z0-9]*)/);
    if (htmlTag) {
      const bracket = remaining[0] === "<" && remaining[1] === "/" ? "</" : "<";
      tokens.push({ text: bracket, color: COLORS.punct });
      tokens.push({ text: htmlTag[1], color: COLORS.tag });
      remaining = remaining.slice(htmlTag[0].length);
      matched = true;
      continue;
    }

    // Keywords
    const kw = remaining.match(
      /^(import|export|from|default|const|let|var|function|return|if|else|new|typeof|type|interface|extends|implements|class|async|await|true|false|null|undefined|as)\b/
    );
    if (kw) {
      tokens.push({ text: kw[0], color: COLORS.keyword });
      remaining = remaining.slice(kw[0].length);
      matched = true;
      continue;
    }

    // JSX attribute names (word followed by =)
    const attr = remaining.match(/^([a-zA-Z_][\w-]*)(?==)/);
    if (attr) {
      tokens.push({ text: attr[0], color: COLORS.attr });
      remaining = remaining.slice(attr[0].length);
      matched = true;
      continue;
    }

    // Numbers
    const num = remaining.match(/^\d+(\.\d+)?/);
    if (num) {
      tokens.push({ text: num[0], color: COLORS.number });
      remaining = remaining.slice(num[0].length);
      matched = true;
      continue;
    }

    // Punctuation
    const punct = remaining.match(/^[{}()[\];:,.<>=!&|?/\\+\-*@#$%^~]+/);
    if (punct) {
      tokens.push({ text: punct[0], color: COLORS.punct });
      remaining = remaining.slice(punct[0].length);
      matched = true;
      continue;
    }

    // Default: word or whitespace
    const word = remaining.match(/^[\w]+|^\s+/);
    if (word) {
      tokens.push({ text: word[0], color: COLORS.default });
      remaining = remaining.slice(word[0].length);
      matched = true;
      continue;
    }

    // Fallback: single char
    if (!matched) {
      tokens.push({ text: remaining[0], color: COLORS.default });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx" }) => {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => highlightCode(code.trim()), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#011627",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 700,
            fontFamily: "inherit",
            color: copied ? "#27c93f" : "rgba(255,255,255,0.5)",
            background: copied ? "rgba(39,201,63,0.1)" : "rgba(255,255,255,0.06)",
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

      {/* Code with line numbers */}
      <pre
        style={{
          padding: "16px 16px 16px 0",
          margin: 0,
          fontSize: "13px",
          fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, monospace",
          lineHeight: 1.7,
          overflowX: "auto",
          color: COLORS.default,
        }}
      >
        <code>{highlighted}</code>
      </pre>
    </div>
  );
};
