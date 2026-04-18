import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "./RadarChart";

const meta: Meta<typeof RadarChart> = {
  title: "Components/RadarChart",
  component: RadarChart,
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

export const Default: Story = {
  args: {
    data: [
      { label: "Speed", value: 85 },
      { label: "Power", value: 70 },
      { label: "Defense", value: 60 },
      { label: "Agility", value: 90 },
      { label: "Stamina", value: 75 },
    ],
    size: 260,
  },
};

export const WithValues: Story = {
  args: {
    data: [
      { label: "React", value: 95 },
      { label: "TypeScript", value: 85 },
      { label: "CSS", value: 80 },
      { label: "Node", value: 70 },
      { label: "Testing", value: 60 },
    ],
    size: 260,
    showValues: true,
  },
};
