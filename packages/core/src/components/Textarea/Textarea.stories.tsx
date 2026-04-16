import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Write something...",
    helperText: "Max 500 characters",
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { label: "Bio", error: "Bio is too short" },
  render: (args) => (
    <div style={{ width: 380 }}>
      <Textarea {...args} />
    </div>
  ),
};
