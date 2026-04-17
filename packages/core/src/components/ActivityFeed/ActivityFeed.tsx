import React from "react";

interface ActivityItem {
  user: string;
  action: string;
  time: string;
  color?: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  onLoadMore?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const FeedItem: React.FC<{ item: ActivityItem }> = ({ item }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "8px 10px",
        borderRadius: "12px",
        transition,
        boxShadow: hovered ? "var(--neu-shadow-raised-sm)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          flexShrink: 0,
          marginTop: "4px",
          background: item.color || "var(--neu-accent)",
        }}
      />
      <div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)", margin: 0 }}>
          <strong>{item.user}</strong> {item.action}
        </p>
        <p style={{ fontSize: "11px", color: "var(--neu-text-secondary)", margin: "2px 0 0" }}>
          {item.time}
        </p>
      </div>
    </div>
  );
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  onLoadMore,
  className,
  style,
}) => {
  return (
    <div className={className} style={style} data-testid="activity-feed">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              animation: `neu-feed-fade-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.04}s both`,
            }}
          >
            <FeedItem item={item} />
          </div>
        ))}
      </div>
      {onLoadMore && (
        <button
          onClick={onLoadMore}
          data-testid="load-more-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "12px",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: "12px",
            padding: "9px",
            border: "none",
            cursor: "pointer",
            borderRadius: "12px",
            background: "var(--neu-bg)",
            color: "var(--neu-text-primary)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            transition,
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
};

ActivityFeed.displayName = "ActivityFeed";
