import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "./MessageList";

const meta: Meta<typeof MessageList> = {
  title: "Components/MessageList",
  component: MessageList,
};

export default meta;
type Story = StoryObj<typeof MessageList>;

const now = new Date();

export const Default: Story = {
  args: {
    maxHeight: "400px",
    showDaySeparators: true,
    messages: [
      { id: "1", role: "user", content: "Hey! Can you help me build a React app?", timestamp: new Date(now.getTime() - 120000) },
      { id: "2", role: "assistant", content: "Of course! I'd love to help. What kind of app are you building?", name: "AI", timestamp: new Date(now.getTime() - 60000) },
      { id: "3", role: "user", content: "A chat interface with neumorphic design.", timestamp: now },
      { id: "4", role: "assistant", content: "Great choice! NeumorUI has everything you need. Let me show you how to set it up with ChatInput, MessageList, and StreamingText components.", name: "AI", timestamp: now },
    ],
  },
};

export const Empty: Story = {
  args: { messages: [] },
};

export const WithSystemMessage: Story = {
  args: {
    messages: [
      { id: "1", role: "system", content: "Conversation started" },
      { id: "2", role: "assistant", content: "Hello! How can I help you today?", name: "AI" },
    ],
  },
};
