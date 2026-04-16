import React from "react";
import { cn } from "../../utils/cn";

type SkeletonVariant = "text" | "avatar" | "card" | "rect";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

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
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="neu-shimmer h-3 rounded-full"
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div
        className={cn("neu-shimmer rounded-full", className)}
        style={{ width: width ?? 40, height: height ?? 40, ...style }}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn("neu-shimmer rounded-neu", className)}
      style={{ width: width ?? "100%", height: height ?? 80, ...style }}
      {...props}
    />
  );
};
