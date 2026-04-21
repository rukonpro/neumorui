import React, { useRef, useEffect, useState, useCallback } from "react";

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export interface ChatMessage {
  /** Unique message ID */
  id: string;
  /** Message sender role */
  role: "user" | "assistant" | "system";
  /** Message content (string or JSX) */
  content: React.ReactNode;
  /** Message timestamp */
  timestamp?: Date;
  /** Avatar image URL */
  avatar?: string;
  /** Sender display name */
  name?: string;
}

interface MessageListProps {
  /** Array of chat messages */
  messages: ChatMessage[];
  /** Custom message renderer */
  renderMessage?: (message: ChatMessage) => React.ReactNode;
  /** Show loading indicator at top */
  loading?: boolean;
  /** Custom empty state content */
  emptyState?: React.ReactNode;
  /** Show date separators between days */
  showDaySeparators?: boolean;
  /** Called when scrolled to top (pagination) */
  onScrollTop?: () => void;
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean;
  /** Maximum height of the message list */
  maxHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDaySeparator(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = today.getTime() - msgDay.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function isSameDay(a?: Date, b?: Date): boolean {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  renderMessage,
  loading,
  emptyState,
  showDaySeparators,
  onScrollTop,
  autoScroll = true,
  maxHeight = "500px",
  className,
  style,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (autoScroll) scrollToBottom();
  }, [messages.length, autoScroll, scrollToBottom]);

  // Scroll handler
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowScrollBtn(!atBottom);
    if (el.scrollTop < 50 && onScrollTop) onScrollTop();
  };

  // Empty state
  if (messages.length === 0 && !loading) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          color: "var(--neu-text-muted)",
          fontSize: "14px",
          fontWeight: 600,
          ...style,
        }}
      >
        {emptyState || "No messages yet"}
      </div>
    );
  }

  const defaultRender = (msg: ChatMessage) => {
    const isUser = msg.role === "user";
    const isSystem = msg.role === "system";

    if (isSystem) {
      return (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--neu-text-muted)", fontStyle: "italic" }}>
            {msg.content}
          </span>
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end", gap: "8px", maxWidth: "85%" , marginLeft: isUser ? "auto" : undefined }}>
        {/* Avatar */}
        {!isUser && (
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: msg.avatar ? "transparent" : "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
            boxShadow: "var(--neu-shadow-raised-sm)",
            fontSize: "12px",
            fontWeight: 800,
            color: "#fff",
          }}>
            {msg.avatar ? (
              <img src={msg.avatar} alt={msg.name || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              (msg.name || "AI").slice(0, 2).toUpperCase()
            )}
          </div>
        )}

        {/* Bubble */}
        <div>
          {msg.name && !isUser && (
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-accent)", marginLeft: "12px", display: "block", marginBottom: "2px" }}>
              {msg.name}
            </span>
          )}
          <div style={{
            padding: "10px 16px",
            borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: isUser
              ? "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))"
              : "var(--neu-bg)",
            boxShadow: isUser
              ? "3px 3px 10px rgba(100,80,220,0.3)"
              : "var(--neu-shadow-raised-sm)",
            color: isUser ? "#fff" : "var(--neu-text-primary)",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.6,
          }}>
            {msg.content}
          </div>
          {msg.timestamp && (
            <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)", marginTop: "3px", display: "block", textAlign: isUser ? "right" : "left", padding: "0 12px" }}>
              {formatTime(msg.timestamp)}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={scrollRef}
        className={className}
        role="log"
        aria-live="polite"
        onScroll={handleScroll}
        style={{
          maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          scrollbarWidth: "none",
          ...style,
        }}
      >
        {/* Loading at top */}
        {loading && (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <span style={{ width: "20px", height: "20px", border: "2px solid var(--neu-text-muted)", borderTopColor: "var(--neu-accent)", borderRadius: "50%", display: "inline-block", animation: "neuMsgSpin 0.6s linear infinite" }} />
          </div>
        )}

        {messages.map((msg, i) => {
          const prevMsg = i > 0 ? messages[i - 1] : null;
          const showSep = showDaySeparators && msg.timestamp && (!prevMsg?.timestamp || !isSameDay(msg.timestamp, prevMsg.timestamp));

          return (
            <React.Fragment key={msg.id}>
              {showSep && msg.timestamp && (
                <div style={{ textAlign: "center", padding: "8px 0" }}>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--neu-text-muted)",
                    padding: "3px 12px",
                    borderRadius: "8px",
                    background: "var(--neu-bg)",
                    boxShadow: "var(--neu-shadow-inset-sm)",
                  }}>
                    {formatDaySeparator(msg.timestamp)}
                  </span>
                </div>
              )}
              {renderMessage ? renderMessage(msg) : defaultRender(msg)}
            </React.Fragment>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          type="button"
          onClick={() => scrollToBottom()}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised)",
            color: "var(--neu-accent)",
            fontSize: "16px",
            zIndex: 5,
            animation: "neuMsgFadeIn 0.2s ease",
            transition,
          }}
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      )}

      <style>{`
        @keyframes neuMsgSpin { to { transform: rotate(360deg); } }
        @keyframes neuMsgFadeIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>
    </div>
  );
};

MessageList.displayName = "MessageList";
