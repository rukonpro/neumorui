import React from "react";

type StepStatus = "done" | "active" | "pending";

interface Step {
  label: string;
  description?: string;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  orientation?: "vertical" | "horizontal";
  className?: string;
  style?: React.CSSProperties;
}

const circleBase: React.CSSProperties = {
  width: "32px",
  height: "32px",
  minWidth: "32px",
  borderRadius: "10px",
  fontSize: "12px",
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const circleStyles: Record<StepStatus, React.CSSProperties> = {
  done: {
    background: "linear-gradient(145deg, #78dbb8, #3db88a)",
    color: "#fff",
    boxShadow: "3px 3px 8px rgba(60,150,100,.35)",
  },
  active: {
    background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
    color: "#fff",
    boxShadow: "3px 3px 8px rgba(108,126,248,.4)",
  },
  pending: {
    background: "var(--neu-bg)",
    color: "var(--neu-text-muted)",
    boxShadow: "var(--neu-shadow-raised-sm)",
  },
};

const badgeBase: React.CSSProperties = {
  fontSize: "9px",
  fontWeight: 800,
  padding: "2px 8px",
  borderRadius: "999px",
};

const badgeStyles: Record<string, React.CSSProperties> = {
  done: {
    background: "var(--neu-tint-primary, rgba(61,184,138,.15))",
    color: "var(--neu-success)",
  },
  active: {
    background: "var(--neu-tint-primary, rgba(108,126,248,.15))",
    color: "var(--neu-accent)",
  },
};

const badgeLabels: Record<string, string> = {
  done: "Done",
  active: "Active",
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = "vertical",
  className,
  style,
  ...rest
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap: isHorizontal ? "8px" : "0",
        ...style,
      }}
      role="list"
      {...rest}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          role="listitem"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "13px",
            transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
          }}
        >
          <div style={{ ...circleBase, ...circleStyles[step.status] }}>
            {step.status === "done" ? "✓" : index + 1}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--neu-text-primary)",
                }}
              >
                {step.label}
              </span>
              {badgeLabels[step.status] && (
                <span style={{ ...badgeBase, ...badgeStyles[step.status] }}>
                  {badgeLabels[step.status]}
                </span>
              )}
            </div>
            {step.description && (
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--neu-text-secondary)",
                }}
              >
                {step.description}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Stepper.displayName = "Stepper";
