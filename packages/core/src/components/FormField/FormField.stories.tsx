import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "../Input/Input";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <FormField label="Email" required helperText="We'll never share your email.">
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <FormField label="Name" error="Name is required" required>
        <Input placeholder="John Doe" />
      </FormField>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 460 }}>
      <FormField label="Bio" horizontal>
        <Input placeholder="Tell us about yourself" />
      </FormField>
    </div>
  ),
};
