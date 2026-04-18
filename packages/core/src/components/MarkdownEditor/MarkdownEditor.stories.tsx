import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownEditor } from "./MarkdownEditor";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Components/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic markdown editor with live preview.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    minHeight: { control: { type: "number", min: 100, max: 500 } },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const Default: Story = {
  args: { label: "Markdown" },
};

export const WithContent: Story = {
  args: {
    label: "Notes",
    value: "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n\n> A blockquote",
  },
};

export const Disabled: Story = {
  args: { label: "Markdown", disabled: true },
};
