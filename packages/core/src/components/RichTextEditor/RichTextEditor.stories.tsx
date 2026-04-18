import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic rich text editor with a formatting toolbar.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    minHeight: { control: { type: "number", min: 100, max: 500 } },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: { label: "Content" },
};

export const WithInitialValue: Story = {
  args: {
    label: "Blog Post",
    value: "<p>Hello <strong>world</strong>! This is a <em>rich text</em> editor.</p>",
  },
};

export const Disabled: Story = {
  args: { label: "Content", disabled: true },
};
