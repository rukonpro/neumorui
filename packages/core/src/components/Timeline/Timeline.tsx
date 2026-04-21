import React, { useState } from "react";

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface TimelineProps {
  /** Timeline entries to render */
  items: TimelineItem[];
  /** Layout direction of the timeline */
  orientation?: "vertical" | "horizontal";
  /** Alternate items left and right */
  alternating?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const TimelineNode: React.FC<{
  item: TimelineItem;
  index: number;
  isLast: boolean;
  side: "left" | "right";
  orientation: "vertical" | "horizontal";
}> = ({ item, index, isLast, side, orientation }) => {
  const [hovered, setHovered] = useState(false);
  const accentColor = item.color || "var(--neu-accent)";

  const dotStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "var(--neu-bg)",
    boxShadow: hovered
      ? "var(--neu-shadow-raised)"
      : "var(--neu-shadow-raised-sm)",
    color: accentColor,
    fontSize: "14px",
    fontWeight: 800,
    transition,
    transform: hovered ? "scale(1.1)" : "none",
    zIndex: 2,
  };

  const cardStyle: React.CSSProperties = {
    padding: "14px 18px",
    borderRadius: "16px",
    background: "var(--neu-bg)",
    boxShadow: hovered
      ? "var(--neu-shadow-raised)"
      : "var(--neu-shadow-raised-sm)",
    transform: hovered ? "translateY(-2px)" : "none",
    transition,
    flex: 1,
  };

  if (orientation === "horizontal") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          position: "relative",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={dotStyle}>
          {item.icon || index + 1}
        </div>
        {!isLast && (
          <div
            style={{
              position: "absolute",
              top: "18px",
              left: "calc(50% + 18px)",
              right: "calc(-50% + 18px)",
              height: "2px",
              background: `linear-gradient(90deg, ${accentColor}, var(--neu-border))`,
              zIndex: 1,
            }}
          />
        )}
        <div style={{ ...cardStyle, marginTop: "12px", textAlign: "center" }}>
          {item.date && (
            <div style={{ fontSize: "10px", fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
              {item.date}
            </div>
          )}
          <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)", marginBottom: item.description ? "4px" : 0 }}>
            {item.title}
          </div>
          {item.description && (
            <div style={{ fontSize: "12px", color: "var(--neu-text-secondary)", lineHeight: 1.5 }}>
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vertical
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        position: "relative",
        flexDirection: side === "right" ? "row" : "row-reverse",
        textAlign: side === "right" ? "left" : "right",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connector line */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            left: side === "right" ? "17px" : undefined,
            right: side === "left" ? "17px" : undefined,
            top: "36px",
            bottom: "-16px",
            width: "2px",
            background: `linear-gradient(180deg, ${accentColor}, var(--neu-border))`,
            zIndex: 1,
          }}
        />
      )}

      {/* Dot */}
      <div style={dotStyle}>
        {item.icon || index + 1}
      </div>

      {/* Card */}
      <div style={cardStyle}>
        {item.date && (
          <div style={{ fontSize: "10px", fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
            {item.date}
          </div>
        )}
        <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)", marginBottom: item.description ? "4px" : 0 }}>
          {item.title}
        </div>
        {item.description && (
          <div style={{ fontSize: "12px", color: "var(--neu-text-secondary)", lineHeight: 1.5 }}>
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = "vertical",
  alternating = false,
  className,
  style,
}) => {
  if (orientation === "horizontal") {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "8px",
          ...style,
        }}
      >
        {items.map((item, i) => (
          <TimelineNode
            key={i}
            item={item}
            index={i}
            isLast={i === items.length - 1}
            side="right"
            orientation="horizontal"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "8px",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <TimelineNode
          key={i}
          item={item}
          index={i}
          isLast={i === items.length - 1}
          side={alternating ? (i % 2 === 0 ? "right" : "left") : "right"}
          orientation="vertical"
        />
      ))}
    </div>
  );
};

Timeline.displayName = "Timeline";
