import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./TagInput";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  args: {
    label: "Tags",
    placeholder: "Type and press Enter...",
  },
};

export const WithDefaults: Story = {
  args: {
    label: "Skills",
    defaultValue: ["React", "TypeScript", "Node.js"],
    maxTags: 5,
    helperText: "Maximum 5 tags allowed.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Categories",
    defaultValue: ["Invalid"],
    error: true,
    helperText: "Please add at least 2 tags.",
  },
};
