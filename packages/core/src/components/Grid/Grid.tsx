import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  rowGap?: number | string;
  colGap?: number | string;
  minChildWidth?: string;
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  start?: number;
  end?: number;
}

export const Grid: React.FC<GridProps> = ({
  cols = 12,
  gap = 16,
  rowGap,
  colGap,
  minChildWidth,
  children,
  className,
  style,
  ...props
}) => {
  const gridTemplate = minChildWidth
    ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    : typeof cols === "number"
      ? `repeat(${cols}, 1fr)`
      : undefined;

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: gridTemplate,
        gap: rowGap || colGap ? undefined : typeof gap === "number" ? `${gap}px` : gap,
        rowGap: rowGap ? (typeof rowGap === "number" ? `${rowGap}px` : rowGap) : undefined,
        columnGap: colGap ? (typeof colGap === "number" ? `${colGap}px` : colGap) : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const Col: React.FC<ColProps> = ({
  span,
  start,
  end,
  children,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={className}
      style={{
        ...(span ? { gridColumn: `span ${span}` } : {}),
        ...(start ? { gridColumnStart: start } : {}),
        ...(end ? { gridColumnEnd: end } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
