import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "./AreaChart";

const meta: Meta<typeof AreaChart> = {
  title: "Components/AreaChart",
  component: AreaChart,
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

const data = [
  { label: "Mon", value: 30 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 42 },
  { label: "Thu", value: 75 },
  { label: "Fri", value: 62 },
  { label: "Sat", value: 88 },
  { label: "Sun", value: 70 },
];

export const Default: Story = {
  args: { data, height: 160 },
};

export const WithValues: Story = {
  args: { data, height: 180, showValues: true },
};

export const CustomColor: Story = {
  args: { data, height: 160, color: "#5bbf8a" },
};
