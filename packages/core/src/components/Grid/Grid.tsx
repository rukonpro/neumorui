import React from "react";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns */
  cols?: number;
  /** Number of grid rows */
  rows?: number;
  /** Spacing between grid items */
  gap?: number | string;
  /** Vertical spacing between rows */
  rowGap?: number | string;
  /** Horizontal spacing between columns */
  colGap?: number | string;
  /** Minimum child width for auto-fit */
  minChildWidth?: string;
  /** Vertical alignment of grid items */
  alignItems?: React.CSSProperties["alignItems"];
  /** Horizontal alignment of grid items */
  justifyItems?: React.CSSProperties["justifyItems"];
  /** Alignment of the grid content vertically */
  alignContent?: React.CSSProperties["alignContent"];
  /** Alignment of the grid content horizontally */
  justifyContent?: React.CSSProperties["justifyContent"];
  /** Grid auto-flow direction */
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";
  /** Custom grid-template-columns value */
  templateColumns?: string;
  /** Custom grid-template-rows value */
  templateRows?: string;
  /** Named grid template areas */
  areas?: string;
  /** Use inline-grid display */
  inline?: boolean;
  /** Size of implicitly created rows */
  autoRows?: string;
  /** Size of implicitly created columns */
  autoCols?: string;
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: number;
  /** Column start position */
  start?: number;
  /** Column end position */
  end?: number;
  /** Number of rows to span */
  rowSpan?: number;
  /** Row start position */
  rowStart?: number;
  /** Row end position */
  rowEnd?: number;
  /** Visual order of the item */
  order?: number;
  /** Named grid area to place item */
  area?: string;
  /** Vertical self-alignment */
  alignSelf?: React.CSSProperties["alignSelf"];
  /** Horizontal self-alignment */
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
Grid.displayName = "Grid";
