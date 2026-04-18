import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./Sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "Components/Sparkline",
  component: Sparkline,
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const TrendUp: Story = {
  args: { data: [20, 35, 28, 50, 42, 65, 58, 72], color: "var(--neu-success)" },
};

export const TrendDown: Story = {
  args: { data: [60, 55, 48, 52, 45, 38, 42, 35], color: "var(--neu-danger)" },
};

export const InlineUsage: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 60 }}>Revenue</span>
        <Sparkline data={[20, 35, 28, 50, 42, 65, 58, 72]} color="var(--neu-success)" />
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--neu-success)" }}>+18%</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 60 }}>Churn</span>
        <Sparkline data={[10, 15, 12, 18, 22, 25, 20, 28]} color="var(--neu-danger)" />
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--neu-danger)" }}>+8%</span>
      </div>
    </div>
  ),
};
