import React from "react";

interface AspectRatioProps {
  ratio?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${(1 / ratio) * 100}%`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
};

AspectRatio.displayName = "AspectRatio";
