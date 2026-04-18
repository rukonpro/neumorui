import React from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps {
  size?: ContainerSize;
  centered?: boolean;
  padding?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const maxWidths: Record<ContainerSize, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
};

export const Container: React.FC<ContainerProps> = ({
  size = "lg",
  centered = true,
  padding = true,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: maxWidths[size],
        marginLeft: centered ? "auto" : undefined,
        marginRight: centered ? "auto" : undefined,
        paddingLeft: padding ? "16px" : undefined,
        paddingRight: padding ? "16px" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Container.displayName = "Container";
