import React from "react";

type SkeletonVariant = "text" | "avatar" | "card" | "rect";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--neu-shadow-dark) 25%, var(--neu-shadow-light) 50%, var(--neu-shadow-dark) 75%)",
  backgroundSize: "200% 100%",
  animation: "neuShimmer 1.6s linear infinite",
  boxShadow: "var(--neu-shadow-inset-sm)",
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rect",
  width,
  height,
  lines = 3,
  className,
  style,
  ...props
}) => {
  if (variant === "text") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            style={{
              ...shimmerStyle,
              height: "10px",
              borderRadius: "5px",
              width: i === lines - 1 ? "60%" : i === lines - 2 ? "90%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div
        className={className}
        style={{
          ...shimmerStyle,
          width: width ?? 48,
          height: height ?? 48,
          borderRadius: "14px",
          flexShrink: 0,
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        ...shimmerStyle,
        width: width ?? "100%",
        height: height ?? 60,
        borderRadius: "14px",
        ...style,
      }}
      {...props}
    />
  );
};
Skeleton.displayName = "Skeleton";
