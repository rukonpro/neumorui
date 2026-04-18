import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic date range picker with calendar dropdown.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: { label: "Date Range" },
};

export const WithError: Story = {
  args: { label: "Date Range", error: "Please select a valid range" },
};

export const Disabled: Story = {
  args: { label: "Date Range", disabled: true },
};
