import React from "react";
import { cn } from "../../utils/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: "online" | "offline" | "busy" | "away";
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-9 h-9 text-[13px]",
  md: "w-11 h-11 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
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
  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center overflow-hidden font-semibold",
          sizeClasses[size]
        )}
        style={{
          background: src
            ? "transparent"
            : "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
          boxShadow: "var(--neu-shadow-raised)",
          color: "#fff",
          ...style,
        }}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2"
          style={{
            width: size === "sm" ? 8 : size === "xl" ? 14 : 10,
            height: size === "sm" ? 8 : size === "xl" ? 14 : 10,
            background: statusColors[status],
            borderColor: "var(--neu-bg)",
          }}
        />
      )}
    </div>
  );
};
