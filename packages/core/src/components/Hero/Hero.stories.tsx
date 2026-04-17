import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    eyebrow: "New \u00B7 Clay UI v2.0",
    title: (
      <>
        Build faster with
        <br />
        <span style={{ color: "var(--neu-accent)" }}>soft clay components</span>
      </>
    ),
    subtitle: "A beautiful React UI library with neumorphic design, dark mode, animations, and 50+ components.",
    actions: (
      <>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "13px 28px",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            borderRadius: "12px",
            color: "#fff",
            background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
            boxShadow: "5px 5px 14px rgba(108,126,248,.45), -3px -3px 10px rgba(255,255,255,0.95)",
          }}
        >
          Get started
        </button>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "13px 28px",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            borderRadius: "12px",
            background: "var(--neu-bg)",
            color: "var(--neu-text-primary)",
            boxShadow: "var(--neu-shadow-raised-sm)",
          }}
        >
          View docs
        </button>
      </>
    ),
  },
};
