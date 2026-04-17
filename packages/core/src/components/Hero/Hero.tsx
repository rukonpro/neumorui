import React from "react";

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  backgroundGradient?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  title,
  subtitle,
  actions,
  backgroundGradient = "linear-gradient(135deg, #c8d0fd 0%, #f9c9c4 50%, #c8f3e4 100%)",
  className,
  style,
}) => {
  return (
    <div
      className={className}
      data-testid="hero"
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "var(--neu-shadow-raised-lg)",
        ...style,
      }}
    >
      <div
        style={{
          background: backgroundGradient,
          padding: "3rem 2rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Frosted overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--neu-bg)",
            opacity: 0.1,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          {eyebrow && (
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--neu-accent)",
                padding: "5px 16px",
                borderRadius: "999px",
                boxShadow: "var(--neu-shadow-raised-sm)",
                marginBottom: "16px",
              }}
            >
              {eyebrow}
            </span>
          )}
          <h2
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "12px",
              color: "var(--neu-text-primary)",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "14px",
                color: "var(--neu-text-secondary)",
                maxWidth: "400px",
                margin: "0 auto 24px",
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}
          {actions && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Hero.displayName = "Hero";
