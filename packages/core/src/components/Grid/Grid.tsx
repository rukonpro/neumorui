import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  rows?: number;
  gap?: number | string;
  rowGap?: number | string;
  colGap?: number | string;
  minChildWidth?: string;
  alignItems?: React.CSSProperties["alignItems"];
  justifyItems?: React.CSSProperties["justifyItems"];
  alignContent?: React.CSSProperties["alignContent"];
  justifyContent?: React.CSSProperties["justifyContent"];
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";
  templateColumns?: string;
  templateRows?: string;
  areas?: string;
  inline?: boolean;
  autoRows?: string;
  autoCols?: string;
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  start?: number;
  end?: number;
  rowSpan?: number;
  rowStart?: number;
  rowEnd?: number;
  order?: number;
  area?: string;
  alignSelf?: React.CSSProperties["alignSelf"];
  justifySelf?: React.CSSProperties["justifySelf"];
}

const toGap = (v: number | string | undefined): string | undefined => {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
};

export const Grid: React.FC<GridProps> = ({
  cols,
  rows,
  gap = 16,
  rowGap,
  colGap,
  minChildWidth,
  alignItems,
  justifyItems,
  alignContent,
  justifyContent,
  flow,
  templateColumns,
  templateRows,
  areas,
  inline,
  autoRows,
  autoCols,
  children,
  className,
  style,
  ...props
}) => {
  let gridCols = templateColumns;
  if (!gridCols) {
    if (minChildWidth) {
      gridCols = `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`;
    } else if (cols) {
      gridCols = `repeat(${cols}, 1fr)`;
    }
  }

  const hasSpecificGaps = rowGap !== undefined || colGap !== undefined;

  return (
    <div
      className={className}
      style={{
        display: inline ? "inline-grid" : "grid",
        gridTemplateColumns: gridCols,
        gridTemplateRows: templateRows || (rows ? `repeat(${rows}, 1fr)` : undefined),
        gridTemplateAreas: areas,
        gap: hasSpecificGaps ? undefined : toGap(gap),
        rowGap: hasSpecificGaps ? toGap(rowGap ?? gap) : undefined,
        columnGap: hasSpecificGaps ? toGap(colGap ?? gap) : undefined,
        alignItems,
        justifyItems,
        alignContent,
        justifyContent,
        gridAutoFlow: flow,
        gridAutoRows: autoRows,
        gridAutoColumns: autoCols,
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
  rowSpan,
  rowStart,
  rowEnd,
  order,
  area,
  alignSelf,
  justifySelf,
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
        ...(start && !span ? { gridColumnStart: start } : {}),
        ...(start && span ? { gridColumn: `${start} / span ${span}` } : {}),
        ...(end ? { gridColumnEnd: end } : {}),
        ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
        ...(rowStart ? { gridRowStart: rowStart } : {}),
        ...(rowEnd ? { gridRowEnd: rowEnd } : {}),
        ...(order !== undefined ? { order } : {}),
        ...(area ? { gridArea: area } : {}),
        ...(alignSelf ? { alignSelf } : {}),
        ...(justifySelf ? { justifySelf } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
