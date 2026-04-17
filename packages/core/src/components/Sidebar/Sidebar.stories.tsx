import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: "Neumorphic sidebar navigation with groups and badges.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    brand: "NeumorUI",
    items: [
      { label: "Dashboard", icon: "🏠", active: true, group: "Main" },
      { label: "Analytics", icon: "📊", group: "Main" },
      { label: "Messages", icon: "💬", badge: 3, group: "Main" },
      { label: "Settings", icon: "⚙️", group: "Other" },
      { label: "Help", icon: "❓", group: "Other" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "220px" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoBrand: Story = {
  args: {
    items: [
      { label: "Home", icon: "🏠", active: true },
      { label: "Profile", icon: "👤" },
      { label: "Notifications", icon: "🔔", badge: 12 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "220px" }}>
        <Story />
      </div>
    ),
  ],
};
