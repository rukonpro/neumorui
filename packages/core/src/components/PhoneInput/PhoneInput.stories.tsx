import type { Meta, StoryObj } from "@storybook/react";
import { PhoneInput } from "./PhoneInput";

const meta: Meta<typeof PhoneInput> = {
  title: "Components/PhoneInput",
  component: PhoneInput,
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: { label: "Phone Number", defaultCountry: "BD" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <PhoneInput {...args} />
    </div>
  ),
};

export const USDefault: Story = {
  args: { label: "Phone", defaultCountry: "US" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <PhoneInput {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { label: "Phone", error: "Invalid phone number" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <PhoneInput {...args} />
    </div>
  ),
};
