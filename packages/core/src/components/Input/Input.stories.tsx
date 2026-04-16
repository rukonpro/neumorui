import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
  render: (args) => (
    <div style={{ width: 340 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithHelper: Story = {
  args: { label: "Username", helperText: "Must be unique" },
  render: (args) => (
    <div style={{ width: 340 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { label: "Email", error: "Invalid email address", defaultValue: "broken@" },
  render: (args) => (
    <div style={{ width: 340 }}>
      <Input {...args} />
    </div>
  ),
};
