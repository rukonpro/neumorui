import type { Meta, StoryObj } from "@storybook/react";
import { ChatBubble } from "./ChatBubble";

const meta: Meta<typeof ChatBubble> = {
  title: "Components/ChatBubble",
  component: ChatBubble,
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Conversation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
      <ChatBubble variant="received" message="Hey! How's the project going?" name="Sarah" avatar="https://i.pravatar.cc/150?img=5" time="10:30 AM" />
      <ChatBubble variant="sent" message="Going great! Just finished 98 components." time="10:32 AM" status="read" />
      <ChatBubble variant="received" message="That's amazing! Can't wait to try them 🎉" name="Sarah" avatar="https://i.pravatar.cc/150?img=5" time="10:33 AM" />
    </div>
  ),
};
