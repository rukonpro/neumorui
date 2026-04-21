import React from "react";

interface ComparisonPlan {
  name: string;
  highlight?: boolean;
  values: (string | boolean)[];
}

interface ComparisonTableProps {
  /** List of feature names for rows */
  features: string[];
  /** Plans to compare across columns */
  plans: ComparisonPlan[];
  className?: string;
  style?: React.CSSProperties;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  features,
  plans,
  className,
  style,
  ...rest
}) => {
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  return (
    <div className={className} style={{ overflowX: "auto", ...style }} data-testid="comparison-table" {...rest}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--neu-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "6px 10px",
              }}
            >
              Feature
            </th>
            {plans.map((plan, i) => (
              <th
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: plan.highlight ? "var(--neu-accent)" : "var(--neu-text-secondary)",
                  padding: "6px 10px",
                }}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, rowIdx) => (
            <tr
              key={rowIdx}
              onMouseEnter={() => setHoveredRow(rowIdx)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--neu-text-primary)",
                  padding: "8px 10px",
                  borderRadius: "8px 0 0 8px",
                  background: hoveredRow === rowIdx ? "rgba(108,126,248,.04)" : undefined,
                  transition: "background 0.2s ease",
                }}
              >
                {feature}
              </td>
              {plans.map((plan, colIdx) => {
                const val = plan.values[rowIdx];
                const isBoolean = typeof val === "boolean";
                const isHighlight = plan.highlight;
                return (
                  <td
                    key={colIdx}
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: isHighlight ? 900 : 700,
                      color: isBoolean
                        ? val
                          ? "var(--neu-accent)"
                          : "var(--neu-text-muted)"
                        : isHighlight
                          ? "var(--neu-accent)"
                          : "var(--neu-text-secondary)",
                      padding: "8px 10px",
                      background: hoveredRow === rowIdx ? "rgba(108,126,248,.04)" : undefined,
                      transition: "background 0.2s ease",
                      borderRadius:
                        colIdx === plans.length - 1
                          ? "0 8px 8px 0"
                          : undefined,
                    }}
                  >
                    {isBoolean ? (val ? "\u2713" : "\u2715") : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ComparisonTable.displayName = "ComparisonTable";
