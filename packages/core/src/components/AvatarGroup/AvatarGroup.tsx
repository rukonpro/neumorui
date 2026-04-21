import React, { useState } from "react";

export interface AvatarGroupItem {
  src?: string;
  name: string;
}

interface AvatarGroupProps {
  /** Array of avatar items to display */
  avatars: AvatarGroupItem[];
  /** Max visible avatars before +N */
  max?: number;
  /** Avatar diameter in pixels */
  size?: number;
  /** Overlap offset in pixels */
  overlap?: number;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 40,
  overlap = 10,
  className,
  style,
}) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {visible.map((av, i) => (
        <AvatarItem key={i} avatar={av} size={size} offset={i > 0 ? -overlap : 0} zIndex={visible.length - i} />
      ))}

      {remaining > 0 && (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: `${size * 0.3}px`,
            fontWeight: 800,
            color: "var(--neu-text-secondary)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            border: "3px solid var(--neu-bg)",
            marginLeft: `${-overlap}px`,
            zIndex: 0,
            position: "relative",
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

const AvatarItem: React.FC<{ avatar: AvatarGroupItem; size: number; offset: number; zIndex: number }> = ({ avatar, size, offset, zIndex }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: avatar.src ? "transparent" : "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
        boxShadow: hovered ? "var(--neu-shadow-raised)" : "var(--neu-shadow-raised-sm)",
        border: "3px solid var(--neu-bg)",
        marginLeft: `${offset}px`,
        zIndex,
        position: "relative",
        transform: hovered ? "translateY(-4px) scale(1.1)" : "none",
        transition,
        cursor: "pointer",
        fontSize: `${size * 0.32}px`,
        fontWeight: 800,
        color: "#fff",
      }}
      title={avatar.name}
    >
      {avatar.src ? (
        <img src={avatar.src} alt={avatar.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        avatar.name.slice(0, 2).toUpperCase()
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";
