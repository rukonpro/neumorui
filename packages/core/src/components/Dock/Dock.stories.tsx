import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "./Dock";

const meta: Meta<typeof Dock> = {
  title: "Components/Dock",
  component: Dock,
};

export default meta;
type Story = StoryObj<typeof Dock>;

export const Default: Story = {
  args: {
    items: [
      { icon: "🏠", label: "Home" },
      { icon: "📁", label: "Files", badge: 3 },
      { icon: "💬", label: "Messages", badge: 12 },
      { icon: "📷", label: "Photos" },
      { icon: "🎵", label: "Music" },
      { icon: "⚙️", label: "Settings" },
    ],
  },
};
