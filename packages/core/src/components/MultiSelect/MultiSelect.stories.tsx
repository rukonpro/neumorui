import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic multi-select dropdown with search and chip display.",
      },
    },
  },
  argTypes: {
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

export const Default: Story = {
  args: {
    label: "Frameworks",
    options,
    placeholder: "Select frameworks...",
  },
};

export const WithPreselected: Story = {
  args: {
    label: "Frameworks",
    options,
    value: ["react", "vue"],
  },
};

export const WithError: Story = {
  args: {
    label: "Frameworks",
    options,
    error: "At least one framework is required",
  },
};
