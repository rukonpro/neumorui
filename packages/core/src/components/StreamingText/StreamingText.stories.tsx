import type { Meta, StoryObj } from "@storybook/react";
import { StreamingText } from "./StreamingText";

const meta: Meta<typeof StreamingText> = {
  title: "Components/StreamingText",
  component: StreamingText,
};

export default meta;
type Story = StoryObj<typeof StreamingText>;

export const Default: Story = {
  args: {
    text: "Hello! I'm an AI assistant built with NeumorUI. I can help you build beautiful neumorphic interfaces with React and TypeScript.",
    speed: 40,
  },
};

export const Fast: Story = {
  args: {
    text: "This text streams very quickly at 100 characters per second.",
    speed: 100,
  },
};

export const ClickToSkip: Story = {
  args: {
    text: "Click anywhere on this text to skip the animation and show the full content immediately.",
    speed: 20,
    skipOnClick: true,
  },
};
