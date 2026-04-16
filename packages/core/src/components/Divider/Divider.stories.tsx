import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Variants: Story = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: "var(--neu-text-secondary)" }}>Above</p>
      <Divider />
      <p style={{ color: "var(--neu-text-secondary)" }}>Between</p>
      <Divider label="OR" />
      <p style={{ color: "var(--neu-text-secondary)" }}>Below</p>
      <div style={{ display: "flex", gap: 16, height: 60, alignItems: "center" }}>
        <span>Left</span>
        <Divider orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
};
