import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";

const meta: Meta<typeof TableOfContents> = {
  title: "Components/TableOfContents",
  component: TableOfContents,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic table of contents with scroll tracking.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

const sampleItems = [
  { id: "intro", text: "Introduction", level: 1 },
  { id: "getting-started", text: "Getting Started", level: 1 },
  { id: "installation", text: "Installation", level: 2 },
  { id: "config", text: "Configuration", level: 2 },
  { id: "api", text: "API Reference", level: 1 },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    activeId: "getting-started",
  },
};

export const CustomTitle: Story = {
  args: {
    items: sampleItems,
    title: "Table of Contents",
    activeId: "installation",
  },
};
