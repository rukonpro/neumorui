import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    title: "App.tsx",
    language: "tsx",
    code: `import { Button, Card } from "neumorui";

export function App() {
  return (
    <Card variant="raised">
      <h1>Hello NeumorUI</h1>
      <Button variant="primary">
        Get Started
      </Button>
    </Card>
  );
}`,
  },
};

export const NoLineNumbers: Story = {
  args: {
    code: `npm install neumorui`,
    language: "bash",
    showLineNumbers: false,
  },
};
