import type { Meta, StoryObj } from "@storybook/react";
import { PromptCard, PromptGrid } from "./PromptCard";

const meta: Meta<typeof PromptCard> = {
  title: "Components/PromptCard",
  component: PromptCard,
};

export default meta;
type Story = StoryObj<typeof PromptCard>;

export const Default: Story = {
  args: {
    icon: "💡",
    title: "Explain this code",
    description: "Break down complex code into simple explanations",
    category: "Coding",
    prompt: "Explain this code step by step",
  },
};

export const Grid: Story = {
  render: () => (
    <PromptGrid
      columns={2}
      onSelect={(p) => console.log(p)}
      prompts={[
        { icon: "💡", title: "Explain code", description: "Break down complex code", category: "Coding", prompt: "Explain this code" },
        { icon: "✍️", title: "Write a blog post", description: "Create engaging content", category: "Writing", prompt: "Write a blog post about" },
        { icon: "🐛", title: "Debug this error", description: "Find and fix the bug", category: "Coding", prompt: "Debug this error" },
        { icon: "🎨", title: "Design a UI", description: "Create a beautiful interface", category: "Design", prompt: "Design a UI for" },
      ]}
    />
  ),
};
