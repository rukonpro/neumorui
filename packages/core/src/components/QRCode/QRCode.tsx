import React, { useMemo } from "react";

interface QRCodeProps {
  /** Data string encoded in the QR code */
  value: string;
  /** Width and height in pixels */
  size?: number;
  /** Foreground module color */
  fgColor?: string;
  /** Background color */
  bgColor?: string;
  /** Use rounded QR modules */
  rounded?: boolean;
  /** Caption text below the code */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Simple QR-like pattern generator (deterministic visual grid from string)
// This creates a decorative QR-style pattern. For production scanning, use a proper QR library.
function generateMatrix(text: string, gridSize: number): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }

  // Finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (row + r < gridSize && col + c < gridSize) {
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          matrix[row + r][col + c] = isOuter || isInner;
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, gridSize - 7);
  drawFinder(gridSize - 7, 0);

  // Fill data area with seeded pseudo-random pattern
  let seed = Math.abs(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (matrix[r][c]) continue;
      // Skip finder areas + quiet zone
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= gridSize - 8) ||
        (r >= gridSize - 8 && c < 8);
      if (inFinder) continue;

      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      matrix[r][c] = seed % 3 !== 0; // ~66% fill
    }
  }

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  return matrix;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  fgColor = "var(--neu-text-primary)",
  bgColor = "var(--neu-bg)",
  rounded = true,
  label,
  className,
  style,
}) => {
  const gridSize = 25;
  const matrix = useMemo(() => generateMatrix(value, gridSize), [value]);
  const cellSize = size / gridSize;
  const r = rounded ? cellSize * 0.35 : 0;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        ...style,
      }}
    >
      <div
        style={{
          padding: "12px",
          borderRadius: "18px",
          background: bgColor,
          boxShadow: "var(--neu-shadow-raised)",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ display: "block" }}
        >
          {matrix.map((row, ri) =>
            row.map((cell, ci) =>
              cell ? (
                <rect
                  key={`${ri}-${ci}`}
                  x={ci * cellSize}
                  y={ri * cellSize}
                  width={cellSize}
                  height={cellSize}
                  rx={r}
                  ry={r}
                  fill={fgColor}
                />
              ) : null
            )
          )}
        </svg>
      </div>
      {label && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--neu-text-muted)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

QRCode.displayName = "QRCode";
