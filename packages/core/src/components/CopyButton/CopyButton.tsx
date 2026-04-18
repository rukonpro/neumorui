import React, { useState, useCallback } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: "raised" | "flat" | "icon";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

const sizeMap = {
  sm: { px: 8, py: 5, font: 11, icon: 12 },
  md: { px: 12, py: 7, font: 12, icon: 14 },
};

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  variant = "raised",
  size = "md",
  className,
  style,
}) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const s = sizeMap[size];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const isIcon = variant === "icon";

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: isIcon ? `${s.py}px` : `${s.py}px ${s.px}px`,
    borderRadius: isIcon ? "10px" : "10px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: `${s.font}px`,
    fontWeight: 700,
    color: copied ? "var(--neu-success)" : "var(--neu-text-secondary)",
    background: "var(--neu-bg)",
    boxShadow: variant === "flat"
      ? "none"
      : hovered
        ? "var(--neu-shadow-inset-sm)"
        : "var(--neu-shadow-raised-sm)",
    transition,
    ...style,
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={baseStyle}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {!isIcon && <span>{copied ? copiedLabel : label}</span>}
    </button>
  );
};

CopyButton.displayName = "CopyButton";
