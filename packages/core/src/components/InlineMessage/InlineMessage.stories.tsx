import type { Meta, StoryObj } from "@storybook/react";
import { InlineMessage } from "./InlineMessage";

const meta: Meta<typeof InlineMessage> = {
  title: "Components/InlineMessage",
  component: InlineMessage,
};

export default meta;
type Story = StoryObj<typeof InlineMessage>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
      <InlineMessage variant="info">This field is optional but recommended.</InlineMessage>
      <InlineMessage variant="success">Email verified successfully!</InlineMessage>
      <InlineMessage variant="warning">Password is too short (min 8 chars).</InlineMessage>
      <InlineMessage variant="danger">This action cannot be undone.</InlineMessage>
    </div>
  ),
};
