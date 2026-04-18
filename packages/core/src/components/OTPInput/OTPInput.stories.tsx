import type { Meta, StoryObj } from "@storybook/react";
import { OTPInput } from "./OTPInput";

const meta: Meta<typeof OTPInput> = {
  title: "Components/OTPInput",
  component: OTPInput,
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {
    label: "Verification Code",
    length: 6,
  },
};

export const FourDigitMasked: Story = {
  args: {
    label: "Enter PIN",
    length: 4,
    masked: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Invalid Code",
    length: 6,
    error: true,
    value: "123456",
  },
};
