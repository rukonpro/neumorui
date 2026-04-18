import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCard } from "./NotificationCard";

const meta: Meta<typeof NotificationCard> = {
  title: "Components/NotificationCard",
  component: NotificationCard,
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const Default: Story = {
  args: { icon: "📦", title: "New order received", description: "Order #1234 placed by John Doe.", time: "2m ago", variant: "success", unread: true },
  render: (args) => (
    <div style={{ width: 400 }}>
      <NotificationCard {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 400 }}>
      <NotificationCard icon="📦" title="New order" description="Order placed." time="2m ago" variant="success" unread onDismiss={() => {}} />
      <NotificationCard icon="⚠️" title="Server warning" description="CPU exceeded 90%." time="15m ago" variant="warning" />
      <NotificationCard icon="💬" title="New comment" description="Alex replied." time="1h ago" />
    </div>
  ),
};
