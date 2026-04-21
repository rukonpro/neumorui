import type { Meta, StoryObj } from "@storybook/react";
import { ThinkingIndicator } from "./ThinkingIndicator";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Components/ThinkingIndicator",
  component: ThinkingIndicator,
};

export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const Default: Story = {
  args: { label: "Thinking..." },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ThinkingIndicator variant="dots" label="Dots" />
      <ThinkingIndicator variant="wave" label="Wave" />
      <ThinkingIndicator variant="pulse" label="Pulse" />
      <ThinkingIndicator variant="typing" label="Typing" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ThinkingIndicator size="sm" label="Small" />
      <ThinkingIndicator size="md" label="Medium" />
      <ThinkingIndicator size="lg" label="Large" />
    </div>
  ),
};
