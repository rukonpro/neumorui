import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatInput } from "./ChatInput";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return <ChatInput value={val} onChange={setVal} onSend={(msg) => { alert(msg); setVal(""); }} />;
  },
};

export const WithAttachment: Story = {
  render: () => <ChatInput showAttachment placeholder="Message with attachment..." />,
};

export const WithMaxLength: Story = {
  render: () => <ChatInput maxLength={200} placeholder="Max 200 characters..." />,
};

export const Loading: Story = {
  args: { value: "Sending...", loading: true },
};
