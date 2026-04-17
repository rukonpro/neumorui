import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "./LineChart";

const meta: Meta<typeof LineChart> = {
  title: "Components/LineChart",
  component: LineChart,
};
export default meta;
type Story = StoryObj<typeof LineChart>;

const weekData = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 390 },
  { label: "Thu", value: 620 },
  { label: "Fri", value: 540 },
  { label: "Sat", value: 780 },
  { label: "Sun", value: 650 },
];

export const Default: Story = { args: { data: weekData } };

export const NoFill: Story = {
  args: { data: weekData, showFill: false },
};

export const CustomColor: Story = {
  args: { data: weekData, color: "#5ecba1" },
};
