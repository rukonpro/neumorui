import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCenter } from "./NotificationCenter";

const meta: Meta<typeof NotificationCenter> = {
  title: "Components/NotificationCenter",
  component: NotificationCenter,
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

export const Default: Story = {
  args: {
    notifications: [
      { id: "1", icon: "📦", title: "New order received", description: "Order #1234 placed by John", time: "2m ago", group: "Today" },
      { id: "2", icon: "💬", title: "New comment", description: "Alex replied to your post", time: "15m ago", group: "Today" },
      { id: "3", icon: "⭐", title: "New review", description: "5-star rating on NeumorUI", time: "1h ago", group: "Today", read: true },
      { id: "4", icon: "🔔", title: "System update", description: "v0.3.0 is available", time: "Yesterday", group: "Earlier", read: true },
    ],
    onReadAll: () => {},
    onClear: () => {},
  },
};
