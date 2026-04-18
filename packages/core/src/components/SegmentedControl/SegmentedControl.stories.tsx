import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    options: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ],
    defaultValue: "week",
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { value: "list", label: "List" },
      { value: "grid", label: "Grid" },
      { value: "board", label: "Board" },
    ],
    defaultValue: "list",
    fullWidth: true,
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    options: [
      { value: "on", label: "On" },
      { value: "off", label: "Off" },
    ],
    defaultValue: "on",
    size: "sm",
  },
};
