import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Onboarding } from "./Onboarding";

const meta: Meta<typeof Onboarding> = {
  title: "Components/Onboarding",
  component: Onboarding,
};

export default meta;
type Story = StoryObj<typeof Onboarding>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button id="onboard-btn" onClick={() => setActive(true)} style={{ padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>
            Start Onboarding
          </button>
          <span id="onboard-text" style={{ fontSize: 13, fontWeight: 600, color: "var(--neu-text-secondary)" }}>
            Click to start the tour
          </span>
        </div>
        <Onboarding
          active={active}
          onComplete={() => setActive(false)}
          onSkip={() => setActive(false)}
          steps={[
            { target: "#onboard-btn", title: "Welcome!", description: "This button triggers the onboarding flow. Click Next to continue.", position: "bottom" },
            { target: "#onboard-text", title: "Info Area", description: "This shows contextual information.", position: "bottom" },
          ]}
        />
      </div>
    );
  },
};
