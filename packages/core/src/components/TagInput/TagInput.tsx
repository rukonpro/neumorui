import React, { useState, useRef, useCallback } from "react";

interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const Tag: React.FC<{
  label: string;
  onRemove: () => void;
  disabled: boolean;
}> = ({ label, onRemove, disabled }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 10px",
        borderRadius: "10px",
        fontSize: "12px",
        fontWeight: 700,
        background: "var(--neu-bg)",
        color: "var(--neu-accent)",
        boxShadow: hovered
          ? "var(--neu-shadow-raised)"
          : "var(--neu-shadow-raised-sm)",
        transform: hovered ? "translateY(-1px)" : "none",
        transition,
        animation: "fadeUp 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "16px",
            height: "16px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            background: "var(--neu-bg)",
            boxShadow: hovered
              ? "var(--neu-shadow-inset-sm)"
              : "var(--neu-shadow-raised-sm)",
            color: "var(--neu-text-muted)",
            fontSize: "10px",
            fontWeight: 800,
            padding: 0,
            lineHeight: 1,
            transition,
          }}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export const TagInput: React.FC<TagInputProps> = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  label,
  placeholder = "Type and press Enter...",
  maxTags,
  disabled = false,
  error = false,
  helperText,
  className,
  style,
}) => {
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tags = controlledValue ?? internalTags;

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    const next = [...tags, trimmed];
    setInternalTags(next);
    onChange?.(next);
    setInputValue("");
  }, [tags, maxTags, onChange]);

  const removeTag = useCallback((index: number) => {
    const next = tags.filter((_, i) => i !== index);
    setInternalTags(next);
    onChange?.(next);
  }, [tags, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const newTags = text.split(/[,\n]/).map((t) => t.trim()).filter(Boolean);
    const current = [...tags];
    for (const t of newTags) {
      if (current.includes(t)) continue;
      if (maxTags && current.length >= maxTags) break;
      current.push(t);
    }
    setInternalTags(current);
    onChange?.(current);
    setInputValue("");
  };

  const atLimit = maxTags !== undefined && tags.length >= maxTags;

  return (
    <div className={className} style={style}>
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: error ? "var(--neu-danger)" : "var(--neu-text-secondary)",
            margin: "0 0 8px",
          }}
        >
          {label}
        </p>
      )}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          padding: "10px 14px",
          borderRadius: "14px",
          background: "var(--neu-bg)",
          boxShadow: error
            ? `var(--neu-shadow-inset-sm), 0 0 0 2px var(--neu-danger-glow)`
            : focused
              ? `var(--neu-shadow-inset-sm), 0 0 0 2px var(--neu-accent-glow)`
              : "var(--neu-shadow-inset-sm)",
          transition,
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.5 : 1,
          minHeight: "44px",
          alignItems: "center",
        }}
      >
        {tags.map((tag, i) => (
          <Tag
            key={`${tag}-${i}`}
            label={tag}
            onRemove={() => removeTag(i)}
            disabled={disabled}
          />
        ))}
        {!atLimit && !disabled && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              if (inputValue.trim()) addTag(inputValue);
            }}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={disabled}
            style={{
              flex: 1,
              minWidth: "80px",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "inherit",
              color: "var(--neu-text-primary)",
              padding: "2px 0",
            }}
          />
        )}
      </div>
      {helperText && (
        <p
          style={{
            fontSize: "11px",
            color: error ? "var(--neu-danger)" : "var(--neu-text-muted)",
            margin: "6px 0 0",
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

TagInput.displayName = "TagInput";
