import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: "Jane Cooper",
    role: "Product Designer",
    bio: "Creating beautiful interfaces and delightful user experiences.",
    avatar: "https://i.pravatar.cc/150?img=5",
    socialLinks: [
      { icon: "🐦", href: "#", label: "Twitter" },
      { icon: "💼", href: "#", label: "LinkedIn" },
      { icon: "🐙", href: "#", label: "GitHub" },
    ],
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <UserCard {...args} />
    </div>
  ),
};

export const WithInitials: Story = {
  args: { name: "Alex Kim", role: "Engineer" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <UserCard {...args} />
    </div>
  ),
};
