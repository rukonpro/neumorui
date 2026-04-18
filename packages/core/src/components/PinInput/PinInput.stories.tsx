import type { Meta, StoryObj } from "@storybook/react";
import { PinInput } from "./PinInput";

const meta: Meta<typeof PinInput> = {
  title: "Components/PinInput",
  component: PinInput,
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  args: { label: "Enter PIN", length: 4 },
};

export const SixDigit: Story = {
  args: { label: "OTP Code", length: 6, size: "sm" },
};

export const Masked: Story = {
  args: { label: "Secret PIN", length: 4, mask: true },
};

export const Large: Story = {
  args: { label: "Verification", length: 4, size: "lg" },
};
