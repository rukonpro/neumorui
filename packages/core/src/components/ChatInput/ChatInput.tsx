import React, { useState, useRef, useCallback, useEffect } from "react";

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

interface ChatInputProps {
  /** Controlled input value */
  value?: string;
  /** Called on text change */
  onChange?: (value: string) => void;
  /** Called when user sends a message */
  onSend?: (message: string) => void;
  /** Called when files are attached */
  onAttach?: (files: FileList) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Show loading spinner on send button */
  loading?: boolean;
  /** Max character limit */
  maxLength?: number;
  /** Show attachment button */
  showAttachment?: boolean;
  /** Max rows before scrolling */
  maxRows?: number;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({
    value: controlledValue,
    onChange,
    onSend,
    onAttach,
    placeholder = "Type a message...",
    disabled,
    loading,
    maxLength,
    showAttachment,
    maxRows = 6,
    autoFocus,
    className,
    style,
  }, ref) => {
    const [internal, setInternal] = useState("");
    const [focused, setFocused] = useState(false);
    const [sendHovered, setSendHovered] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const text = controlledValue ?? internal;
    const canSend = text.trim().length > 0 && !loading && !disabled;

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") ref(textareaRef.current);
        else (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = textareaRef.current;
      }
    }, [ref]);

    // Auto-resize textarea
    const resize = useCallback(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.style.height = "auto";
      const lineHeight = 22;
      const maxHeight = lineHeight * maxRows;
      ta.style.height = `${Math.min(ta.scrollHeight, maxHeight)}px`;
      ta.style.overflowY = ta.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [maxRows]);

    useEffect(() => { resize(); }, [text, resize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;
      if (controlledValue === undefined) setInternal(val);
      onChange?.(val);
    };

    const handleSend = useCallback(() => {
      if (!canSend) return;
      onSend?.(text.trim());
      if (controlledValue === undefined) setInternal("");
      onChange?.("");
    }, [canSend, text, onSend, controlledValue, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      if (e.key === "Escape") {
        textareaRef.current?.blur();
      }
    };

    const handleAttach = () => fileRef.current?.click();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onAttach?.(e.target.files);
        e.target.value = "";
      }
    };

    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          padding: "10px 12px",
          borderRadius: "18px",
          background: "var(--neu-bg)",
          boxShadow: focused
            ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
            : "var(--neu-shadow-inset)",
          transition: "box-shadow 0.2s ease",
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
      >
        {/* Attachment button */}
        {showAttachment && (
          <>
            <button
              type="button"
              onClick={handleAttach}
              disabled={disabled || loading}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                color: "var(--neu-text-muted)",
                fontSize: "16px",
                flexShrink: 0,
                transition,
              }}
              aria-label="Attach file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input ref={fileRef} type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
          </>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          autoFocus={autoFocus}
          rows={1}
          aria-label="Chat message"
          style={{
            flex: 1,
            minWidth: 0,
            resize: "none",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "22px",
            color: "var(--neu-text-primary)",
            padding: "7px 4px",
            overflowY: "hidden",
            scrollbarWidth: "none",
          }}
        />

        {/* Character count */}
        {maxLength && (
          <span style={{
            fontSize: "10px",
            fontWeight: 700,
            color: text.length >= maxLength ? "var(--neu-danger)" : "var(--neu-text-muted)",
            flexShrink: 0,
            alignSelf: "center",
          }}>
            {text.length}/{maxLength}
          </span>
        )}

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          onMouseEnter={() => setSendHovered(true)}
          onMouseLeave={() => setSendHovered(false)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            cursor: canSend ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: canSend
              ? "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))"
              : "var(--neu-bg)",
            boxShadow: canSend && sendHovered
              ? "3px 3px 8px rgba(100,80,220,0.4)"
              : canSend
                ? "2px 2px 6px rgba(100,80,220,0.3)"
                : "var(--neu-shadow-inset-sm)",
            color: canSend ? "#fff" : "var(--neu-text-muted)",
            transform: canSend && sendHovered ? "scale(1.08)" : "none",
            transition,
          }}
          aria-label="Send message"
        >
          {loading ? (
            <span style={{ width: "14px", height: "14px", border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "neuChatSpin 0.6s linear infinite", display: "block" }} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>

        <style>{`@keyframes neuChatSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
