import type { Meta, StoryObj } from "@storybook/react";
import { SpeedDial } from "./SpeedDial";

const meta: Meta<typeof SpeedDial> = {
  title: "Components/SpeedDial",
  component: SpeedDial,
};
export default meta;
type Story = StoryObj<typeof SpeedDial>;

export const Default: Story = {
  args: {
    actions: [
      { label: "Edit", icon: "✏️" },
      { label: "Share", icon: "🔗" },
      { label: "Delete", icon: "🗑️", color: "#f5604a" },
    ],
  },
};
