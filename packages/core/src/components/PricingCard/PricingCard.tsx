import React from "react";

interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  cta: { label: string; variant?: "primary" | "clay" };
  badge?: string;
}

interface PricingCardProps {
  plans: PricingPlan[];
  onCtaClick?: (planName: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const PlanCard: React.FC<{
  plan: PricingPlan;
  idx: number;
  onCtaClick?: (planName: string) => void;
}> = ({ plan, idx, onCtaClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      data-testid={`pricing-plan-${idx}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px",
        borderRadius: "20px",
        boxShadow: hovered
          ? "var(--neu-shadow-raised-lg)"
          : plan.highlighted
            ? "var(--neu-shadow-raised-lg)"
            : "var(--neu-shadow-raised)",
        border: plan.highlighted ? "2px solid rgba(108,126,248,.3)" : undefined,
        position: "relative",
        background: "var(--neu-bg)",
        transform: hovered ? "translateY(-4px)" : undefined,
        transition:
          "transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.25s ease",
      }}
    >
      {plan.badge && plan.highlighted && (
        <div
          style={{
            position: "absolute",
            top: "-11px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "11px",
            fontWeight: 800,
            padding: "4px 16px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #8490fa, #5a6cf5)",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {plan.badge}
        </div>
      )}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: plan.highlighted ? "var(--neu-accent)" : "var(--neu-text-secondary)",
          marginBottom: "10px",
        }}
      >
        {plan.name}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "2.2rem",
            fontWeight: 900,
            color: "var(--neu-text-primary)",
          }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>
            {plan.period}
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          marginBottom: "16px",
        }}
      >
        {plan.features.map((feat, fi) => (
          <div
            key={fi}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: feat.included
                ? "var(--neu-text-primary)"
                : "var(--neu-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {feat.included ? "\u2713" : "\u2717"} {feat.label}
          </div>
        ))}
      </div>
      <button
        data-testid={`pricing-cta-${idx}`}
        onClick={() => onCtaClick?.(plan.name)}
        style={{
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "11px",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          borderRadius: "12px",
          transition,
          ...(plan.cta.variant === "primary" || plan.highlighted
            ? {
                color: "#fff",
                background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
                boxShadow:
                  "5px 5px 14px rgba(108,126,248,.45), -3px -3px 10px var(--neu-shadow-light)",
              }
            : {
                color: "var(--neu-text-primary)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
              }),
        }}
      >
        {plan.cta.label}
      </button>
    </div>
  );
};

export const PricingCard: React.FC<PricingCardProps> = ({
  plans,
  onCtaClick,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      data-testid="pricing-cards"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px",
        ...style,
      }}
    >
      {plans.map((plan, idx) => (
        <PlanCard key={idx} plan={plan} idx={idx} onCtaClick={onCtaClick} />
      ))}
    </div>
  );
};

PricingCard.displayName = "PricingCard";
