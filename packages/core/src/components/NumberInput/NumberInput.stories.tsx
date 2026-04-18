import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: { label: "Quantity", defaultValue: 1, min: 0, max: 99 },
  render: (args) => (
    <div style={{ width: 240 }}>
      <NumberInput {...args} />
    </div>
  ),
};

export const WithStep: Story = {
  args: { label: "Price", defaultValue: 10, step: 5, min: 0 },
  render: (args) => (
    <div style={{ width: 240 }}>
      <NumberInput {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: "Locked", defaultValue: 42, disabled: true },
  render: (args) => (
    <div style={{ width: 240 }}>
      <NumberInput {...args} />
    </div>
  ),
};
