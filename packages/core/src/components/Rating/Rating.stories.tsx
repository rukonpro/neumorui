import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    label: "Rate this product",
    defaultValue: 3,
  },
};

export const Hearts: Story = {
  args: {
    label: "How much do you love it?",
    icon: "heart",
    defaultValue: 4,
    size: "lg",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Average Rating",
    value: 4,
    readOnly: true,
    size: "sm",
  },
};
