import React, { useState, useEffect, useRef, useCallback } from "react";

export interface OnboardingStep {
  target: string; // CSS selector
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface OnboardingProps {
  steps: OnboardingStep[];
  active?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

const transition = "all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const Onboarding: React.FC<OnboardingProps> = ({
  steps,
  active = true,
  onComplete,
  onSkip,
}) => {
  const [current, setCurrent] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[current];

  const updatePosition = useCallback(() => {
    if (!step) return;
    const el = document.querySelector(step.target);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [step]);

  useEffect(() => {
    if (!active) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [active, current, updatePosition]);

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (!active || !step) return null;

  const side = step.position || "bottom";
  const pad = 10;

  const tooltipPos: React.CSSProperties = (() => {
    switch (side) {
      case "top":
        return { top: `${pos.top - pad}px`, left: `${pos.left + pos.width / 2}px`, transform: "translate(-50%, -100%)" };
      case "bottom":
        return { top: `${pos.top + pos.height + pad}px`, left: `${pos.left + pos.width / 2}px`, transform: "translateX(-50%)" };
      case "left":
        return { top: `${pos.top + pos.height / 2}px`, left: `${pos.left - pad}px`, transform: "translate(-100%, -50%)" };
      case "right":
        return { top: `${pos.top + pos.height / 2}px`, left: `${pos.left + pos.width + pad}px`, transform: "translateY(-50%)" };
    }
  })();

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        {/* Dimmed background with spotlight cutout using box-shadow */}
        <div
          style={{
            position: "absolute",
            top: `${pos.top - 6}px`,
            left: `${pos.left - 6}px`,
            width: `${pos.width + 12}px`,
            height: `${pos.height + 12}px`,
            borderRadius: "12px",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
            zIndex: 91,
            transition,
          }}
        />

        {/* Highlight ring */}
        <div
          style={{
            position: "absolute",
            top: `${pos.top - 6}px`,
            left: `${pos.left - 6}px`,
            width: `${pos.width + 12}px`,
            height: `${pos.height + 12}px`,
            borderRadius: "12px",
            border: "2px solid var(--neu-accent)",
            boxShadow: "0 0 20px rgba(108,126,248,0.3)",
            zIndex: 92,
            transition,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          ...tooltipPos,
          zIndex: 93,
          width: "280px",
          padding: "18px",
          borderRadius: "16px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "neuOnboardIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: "auto",
        }}
      >
        {/* Step indicator */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                height: "3px",
                flex: 1,
                borderRadius: "2px",
                background: i <= current ? "var(--neu-accent)" : "var(--neu-bg)",
                boxShadow: i <= current ? "none" : "var(--neu-shadow-inset-sm)",
                transition,
              }}
            />
          ))}
        </div>

        <h4 style={{ fontSize: "15px", fontWeight: 800, color: "var(--neu-text-primary)", margin: "0 0 6px" }}>
          {step.title}
        </h4>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--neu-text-secondary)", lineHeight: 1.6, margin: 0 }}>
          {step.description}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
          <button
            type="button"
            onClick={onSkip}
            style={{
              border: "none",
              outline: "none",
              cursor: "pointer",
              background: "transparent",
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: "inherit",
              color: "var(--neu-text-muted)",
              padding: "4px 8px",
            }}
          >
            Skip
          </button>
          <div style={{ display: "flex", gap: "6px" }}>
            {current > 0 && (
              <OnboardBtn onClick={handlePrev} label="Back" />
            )}
            <OnboardBtn onClick={handleNext} label={current === steps.length - 1 ? "Done" : "Next"} primary />
          </div>
        </div>
      </div>

      {/* Click blocker */}
      <div
        onClick={onSkip}
        role="presentation"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 89,
          cursor: "default",
        }}
      />

      <style>{`
        @keyframes neuOnboardIn {
          from { opacity: 0; transform: ${tooltipPos.transform || ""} scale(0.95); }
          to { opacity: 1; transform: ${tooltipPos.transform || ""} scale(1); }
        }
      `}</style>
    </>
  );
};

const OnboardBtn: React.FC<{ onClick: () => void; label: string; primary?: boolean }> = ({ onClick, label, primary }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px 16px",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: 700,
        fontFamily: "inherit",
        color: primary ? "#fff" : "var(--neu-text-secondary)",
        background: primary
          ? "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))"
          : "var(--neu-bg)",
        boxShadow: primary
          ? "3px 3px 8px rgba(100,80,220,0.3), -2px -2px 5px var(--neu-shadow-light)"
          : hovered
            ? "var(--neu-shadow-inset-sm)"
            : "var(--neu-shadow-raised-sm)",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </button>
  );
};

Onboarding.displayName = "Onboarding";
