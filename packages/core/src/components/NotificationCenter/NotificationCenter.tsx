import React, { useState, useRef, useEffect } from "react";

export interface NotificationItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
  group?: string;
}

interface NotificationCenterProps {
  /** List of notification items */
  notifications: NotificationItem[];
  /** Called when a notification is read */
  onRead?: (id: string) => void;
  /** Mark all notifications as read */
  onReadAll?: () => void;
  /** Remove a notification by id */
  onClear?: (id: string) => void;
  /** Custom trigger button element */
  trigger?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onRead,
  onReadAll,
  onClear,
  trigger,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Group notifications
  const grouped: Record<string, NotificationItem[]> = {};
  notifications.forEach((n) => {
    const g = n.group || "Recent";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(n);
  });

  return (
    <div ref={panelRef} className={className} style={{ position: "relative", display: "inline-block", ...style }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open); }}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer", position: "relative" }}
      >
        {trigger || (
          <button
            type="button"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "14px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              background: "var(--neu-bg)",
              boxShadow: open ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
              transition,
            }}
          >
            🔔
          </button>
        )}

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              minWidth: "18px",
              height: "18px",
              borderRadius: "9px",
              background: "var(--neu-danger)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              border: "2px solid var(--neu-bg)",
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "340px",
            maxHeight: "420px",
            borderRadius: "18px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            overflow: "hidden",
            zIndex: 50,
            animation: "neuNotifIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px 10px" }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--neu-text-primary)" }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-accent)", marginLeft: "6px" }}>
                  {unreadCount} new
                </span>
              )}
            </span>
            {onReadAll && unreadCount > 0 && (
              <button
                type="button"
                onClick={() => { onReadAll(); }}
                style={{
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  background: "transparent",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  color: "var(--neu-accent)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: "340px", overflowY: "auto", padding: "0 8px 8px", scrollbarWidth: "none" }}>
            {notifications.length === 0 && (
              <div style={{ padding: "32px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
                No notifications
              </div>
            )}

            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <div style={{ padding: "8px 10px 4px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--neu-text-muted)" }}>
                  {group}
                </div>
                {items.map((n) => (
                  <NotifItem key={n.id} item={n} onRead={onRead} onClear={onClear} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes neuNotifIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

const NotifItem: React.FC<{
  item: NotificationItem;
  onRead?: (id: string) => void;
  onClear?: (id: string) => void;
}> = ({ item, onRead, onClear }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onRead?.(item.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRead?.(item.id); }}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10px 10px",
        borderRadius: "12px",
        cursor: "pointer",
        background: hovered ? "rgba(108,126,248,0.04)" : "transparent",
        borderLeft: !item.read ? "3px solid var(--neu-accent)" : "3px solid transparent",
        transition,
        marginBottom: "2px",
      }}
    >
      {item.icon && (
        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "12px", fontWeight: item.read ? 600 : 700, color: "var(--neu-text-primary)" }}>
          {item.title}
        </div>
        {item.description && (
          <p style={{ fontSize: "11px", fontWeight: 500, color: "var(--neu-text-muted)", margin: "2px 0 0", lineHeight: 1.4 }}>
            {item.description}
          </p>
        )}
        <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)", marginTop: "4px", display: "block" }}>
          {item.time}
        </span>
      </div>
      {onClear && hovered && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClear(item.id); }}
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--neu-text-muted)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

NotificationCenter.displayName = "NotificationCenter";
