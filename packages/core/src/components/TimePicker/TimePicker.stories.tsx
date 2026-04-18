import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic time picker with hour/minute spinners.",
      },
    },
  },
  argTypes: {
    use24Hour: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: { label: "Time" },
};

export const TwentyFourHour: Story = {
  args: { label: "Time (24h)", use24Hour: true, value: "14:30" },
};

export const Disabled: Story = {
  args: { label: "Time", disabled: true },
};
