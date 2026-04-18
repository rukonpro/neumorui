import React from "react";

type ChatBubbleVariant = "sent" | "received";

interface ChatBubbleProps {
  message: string;
  variant?: ChatBubbleVariant;
  avatar?: string;
  name?: string;
  time?: string;
  status?: "sent" | "delivered" | "read";
  className?: string;
  style?: React.CSSProperties;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  variant = "received",
  avatar,
  name,
  time,
  status,
  className,
  style,
}) => {
  const isSent = variant === "sent";

  const statusIcons: Record<string, string> = {
    sent: "✓",
    delivered: "✓✓",
    read: "✓✓",
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: isSent ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "8px",
        maxWidth: "85%",
        marginLeft: isSent ? "auto" : undefined,
        marginRight: isSent ? undefined : "auto",
        ...style,
      }}
    >
      {/* Avatar */}
      {!isSent && (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "var(--neu-shadow-raised-sm)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: avatar ? "transparent" : "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
            fontSize: "12px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {avatar ? (
            <img src={avatar} alt={name || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            name?.slice(0, 1).toUpperCase() || "?"
          )}
        </div>
      )}

      {/* Bubble */}
      <div>
        {name && !isSent && (
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-accent)", marginLeft: "12px", marginBottom: "2px", display: "block" }}>
            {name}
          </span>
        )}
        <div
          style={{
            padding: "10px 16px",
            borderRadius: isSent ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: isSent
              ? "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))"
              : "var(--neu-bg)",
            boxShadow: isSent
              ? "3px 3px 10px rgba(100,80,220,0.3), -2px -2px 6px var(--neu-shadow-light)"
              : "var(--neu-shadow-raised-sm)",
            color: isSent ? "#fff" : "var(--neu-text-primary)",
          }}
        >
          <p style={{ fontSize: "13px", fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
            {message}
          </p>
        </div>

        {/* Time + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            justifyContent: isSent ? "flex-end" : "flex-start",
            marginTop: "3px",
            padding: "0 12px",
          }}
        >
          {time && (
            <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
              {time}
            </span>
          )}
          {isSent && status && (
            <span
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: status === "read" ? "var(--neu-accent)" : "var(--neu-text-muted)",
              }}
            >
              {statusIcons[status]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

ChatBubble.displayName = "ChatBubble";
