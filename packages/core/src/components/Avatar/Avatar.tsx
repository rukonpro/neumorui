import React from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: "online" | "offline" | "busy" | "away";
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 36,
  md: 44,
  lg: 56,
  xl: 80,
};

const fontSizeMap: Record<AvatarSize, string> = {
  sm: "13px",
  md: "16px",
  lg: "20px",
  xl: "28px",
};

const statusColors = {
  online: "var(--neu-success)",
  offline: "var(--neu-text-muted)",
  busy: "var(--neu-danger)",
  away: "var(--neu-warning)",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = "md",
  status,
  className,
  style,
  ...props
}) => {
  const px = sizeMap[size];
  const dotSize = size === "sm" ? 8 : size === "xl" ? 14 : 10;

  return (
    <div
      className={className}
      style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}
      {...props}
    >
      <div
        style={{
          width: px,
          height: px,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontWeight: 800,
          fontSize: fontSizeMap[size],
          color: "#fff",
          flexShrink: 0,
          background: src
            ? "transparent"
            : "linear-gradient(145deg, #8490fa, #5a6cf5)",
          boxShadow: "var(--neu-shadow-raised)",
          ...style,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: statusColors[status],
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "var(--neu-bg)",
          }}
        />
      )}
    </div>
  );
};
Avatar.displayName = "Avatar";
