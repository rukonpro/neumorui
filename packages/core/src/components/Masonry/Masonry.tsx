import React, { useState, useRef, useEffect, useCallback } from "react";

interface MasonryProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Masonry: React.FC<MasonryProps> = ({
  columns: defaultColumns = 3,
  gap = 12,
  children,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(defaultColumns);

  const updateColumns = useCallback(() => {
    const w = containerRef.current?.clientWidth ?? 800;
    if (w < 480) setColumns(1);
    else if (w < 768) setColumns(Math.min(defaultColumns, 2));
    else setColumns(defaultColumns);
  }, [defaultColumns]);

  useEffect(() => {
    updateColumns();
    const ro = new ResizeObserver(updateColumns);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateColumns]);

  // Distribute children into columns
  const items = React.Children.toArray(children);
  const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);

  items.forEach((child, i) => {
    columnArrays[i % columns].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        gap: `${gap}px`,
        alignItems: "flex-start",
        ...style,
      }}
    >
      {columnArrays.map((colItems, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: `${gap}px`,
          }}
        >
          {colItems.map((item, itemIdx) => (
            <div key={itemIdx}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

Masonry.displayName = "Masonry";
