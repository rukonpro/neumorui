import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "./StatsCard";

const meta: Meta<typeof StatsCard> = {
  title: "Components/StatsCard",
  component: StatsCard,
  parameters: {
    docs: {
      description: {
        component: "Neumorphic statistics card with value, trend, and description.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  args: {
    label: "Total Revenue",
    value: "$12,450",
    trend: { value: "12.5%", direction: "up" },
  },
};

export const TrendDown: Story = {
  args: {
    label: "Bounce Rate",
    value: "32.1%",
    trend: { value: "4.2%", direction: "down" },
    color: "var(--neu-danger)",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Active Users",
    value: "2,847",
    trend: { value: "8.1%", direction: "up" },
    description: "Compared to last month",
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "600px" }}>
      <StatsCard label="Users" value="2,847" trend={{ value: "12%", direction: "up" }} />
      <StatsCard label="Revenue" value="$45K" trend={{ value: "3.2%", direction: "up" }} color="#3db88a" />
      <StatsCard label="Churn" value="1.2%" trend={{ value: "0.4%", direction: "down" }} color="var(--neu-danger)" />
    </div>
  ),
};
