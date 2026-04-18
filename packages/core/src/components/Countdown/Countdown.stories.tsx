import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "./Countdown";

const meta: Meta<typeof Countdown> = {
  title: "Components/Countdown",
  component: Countdown,
};

export default meta;
type Story = StoryObj<typeof Countdown>;

export const Default: Story = {
  args: {
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  },
};

export const InsetSmall: Story = {
  args: {
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
    variant: "inset",
    size: "sm",
    showDays: false,
  },
};

export const Large: Story = {
  args: {
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    size: "lg",
  },
};
