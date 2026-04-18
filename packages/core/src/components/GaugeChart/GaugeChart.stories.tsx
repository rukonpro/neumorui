import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart } from "./GaugeChart";

const meta: Meta<typeof GaugeChart> = {
  title: "Components/GaugeChart",
  component: GaugeChart,
};

export default meta;
type Story = StoryObj<typeof GaugeChart>;

export const Default: Story = {
  args: { value: 75, label: "Score" },
};

export const Low: Story = {
  args: { value: 25, label: "Low" },
};

export const WithSuffix: Story = {
  args: { value: 82, label: "CPU", suffix: "%" },
};

export const AllThree: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <GaugeChart value={28} label="Low" size={130} />
      <GaugeChart value={55} label="Medium" size={130} />
      <GaugeChart value={88} label="High" size={130} />
    </div>
  ),
};
