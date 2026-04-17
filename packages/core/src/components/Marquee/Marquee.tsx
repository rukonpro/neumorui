import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const marqueeKeyframes = `
@keyframes neu-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`;

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 15,
  direction = "left",
  pauseOnHover = false,
  className,
  style,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <style>{marqueeKeyframes}</style>
      <div
        className={className}
        style={{
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "var(--neu-shadow-inset-sm)",
          padding: "10px 0",
          ...style,
        }}
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => pauseOnHover && setHovered(false)}
        {...rest}
      >
        <div
          data-testid="marquee-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: `neu-marquee ${speed}s linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationPlayState:
              pauseOnHover && hovered ? "paused" : "running",
          }}
        >
          {/* Duplicate content for seamless loop */}
          <div style={{ display: "flex" }}>{children}</div>
          <div style={{ display: "flex" }} aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

/** Pre-styled item for use inside Marquee */
export const MarqueeItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 18px",
      margin: "0 4px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 800,
      color: "var(--neu-accent)",
      boxShadow: "var(--neu-shadow-raised-sm)",
      background: "var(--neu-bg)",
    }}
  >
    {children}
  </span>
);

Marquee.displayName = "Marquee";
