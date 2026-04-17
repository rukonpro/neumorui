import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "./Heatmap";

const meta: Meta<typeof Heatmap> = {
  title: "Components/Heatmap",
  component: Heatmap,
};
export default meta;
type Story = StoryObj<typeof Heatmap>;

export const Default: Story = {
  args: {
    data: Array.from({ length: 91 }, () => Math.random()),
  },
};

export const Small: Story = {
  args: {
    data: Array.from({ length: 28 }, () => Math.random()),
    cols: 7,
    rows: 4,
  },
};
