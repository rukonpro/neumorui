import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Components/BarChart",
  component: BarChart,
};
export default meta;
type Story = StoryObj<typeof BarChart>;

const sampleData = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 70 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 65 },
  { label: "Sat", value: 80 },
  { label: "Sun", value: 45 },
];

export const Default: Story = {
  args: { data: sampleData },
};

export const WithTitle: Story = {
  args: {
    data: sampleData,
    title: "Weekly Revenue",
    trend: <span style={{ fontSize: "12px", color: "var(--neu-success)", fontWeight: 700 }}>+12%</span>,
  },
};

export const CustomColors: Story = {
  args: {
    data: [
      { label: "A", value: 60, color: "#f06292" },
      { label: "B", value: 90, color: "#64b5f6" },
      { label: "C", value: 45, color: "#81c784" },
    ],
    height: 160,
  },
};
