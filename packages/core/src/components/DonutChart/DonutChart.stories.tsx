import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "Components/DonutChart",
  component: DonutChart,
};
export default meta;
type Story = StoryObj<typeof DonutChart>;

const segments = [
  { label: "Direct", value: 42, color: "#6c7ef8" },
  { label: "Social", value: 28, color: "#f79548" },
  { label: "Organic", value: 30, color: "#5ecba1" },
];

export const Default: Story = {
  args: {
    segments,
    centerValue: "1.2k",
    centerLabel: "Total",
  },
};

export const CustomSize: Story = {
  args: {
    segments,
    size: 160,
    strokeWidth: 24,
    centerValue: "85%",
    centerLabel: "Score",
  },
};
