import React from "react";

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepsProps {
  /** Array of step items to render */
  steps: StepItem[];
  /** Zero-based index of the active step */
  current: number;
  /** Layout direction of the steps */
  direction?: "horizontal" | "vertical";
  /** Size preset of step circles and text */
  size?: "sm" | "md" | "lg";
  /** Callback fired when a step is clicked */
  onChange?: (step: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)";

const sizeMap = {
  sm: { circle: 28, font: 11, gap: 6 },
  md: { circle: 36, font: 13, gap: 8 },
  lg: { circle: 44, font: 15, gap: 10 },
};

export const Steps: React.FC<StepsProps> = ({
  steps,
  current,
  direction = "horizontal",
  size = "md",
  onChange,
  className,
  style,
}) => {
  const s = sizeMap[size];
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: isHorizontal ? "flex-start" : "stretch",
        gap: `${s.gap}px`,
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        const isPending = i > current;

        return (
          <React.Fragment key={i}>
            <div
              style={{
                display: "flex",
                flexDirection: isHorizontal ? "column" : "row",
                alignItems: isHorizontal ? "center" : "flex-start",
                gap: "8px",
                flex: isHorizontal ? 1 : undefined,
                cursor: onChange ? "pointer" : "default",
              }}
              onClick={() => onChange?.(i)}
              onKeyDown={onChange ? (e) => { if (e.key === 'Enter' || e.key === ' ') onChange(i); } : undefined}
              role={onChange ? "button" : undefined}
              tabIndex={onChange ? 0 : undefined}
            >
              {/* Circle */}
              <div
                style={{
                  width: `${s.circle}px`,
                  height: `${s.circle}px`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${s.font}px`,
                  fontWeight: 800,
                  flexShrink: 0,
                  transition,
                  ...(isDone
                    ? {
                        background: "linear-gradient(145deg, var(--neu-success), #3a9a6a)",
                        color: "#fff",
                        boxShadow: "3px 3px 8px rgba(60,150,100,0.3), -2px -2px 5px var(--neu-shadow-light)",
                      }
                    : isActive
                      ? {
                          background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
                          color: "#fff",
                          boxShadow: "3px 3px 8px rgba(100,80,220,0.35), -2px -2px 5px var(--neu-shadow-light)",
                        }
                      : {
                          background: "var(--neu-bg)",
                          color: "var(--neu-text-muted)",
                          boxShadow: "var(--neu-shadow-inset-sm)",
                        }),
                }}
              >
                {isDone ? (
                  <svg width={s.font} height={s.font} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : step.icon ? (
                  step.icon
                ) : (
                  i + 1
                )}
              </div>

              {/* Text */}
              <div style={{ textAlign: isHorizontal ? "center" : "left" }}>
                <div
                  style={{
                    fontSize: `${s.font - 1}px`,
                    fontWeight: 700,
                    color: isPending ? "var(--neu-text-muted)" : "var(--neu-text-primary)",
                    transition,
                  }}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div
                    style={{
                      fontSize: `${s.font - 3}px`,
                      fontWeight: 600,
                      color: "var(--neu-text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                style={{
                  ...(isHorizontal
                    ? {
                        flex: 0.6,
                        height: "3px",
                        borderRadius: "2px",
                        alignSelf: "center",
                        marginTop: `-${s.circle / 2 + s.gap + 12}px`,
                      }
                    : {
                        width: "3px",
                        height: "24px",
                        borderRadius: "2px",
                        marginLeft: `${s.circle / 2 - 1.5}px`,
                      }),
                  background: isDone
                    ? "linear-gradient(90deg, var(--neu-success), var(--neu-accent))"
                    : "var(--neu-bg)",
                  boxShadow: isDone ? "none" : "var(--neu-shadow-inset-sm)",
                  transition,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Steps.displayName = "Steps";
