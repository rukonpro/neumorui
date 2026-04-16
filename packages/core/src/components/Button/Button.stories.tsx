import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "Core neumorphic button with 8 variants and 3 sizes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["raised", "flat", "inset", "pill", "icon", "primary", "danger", "success"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button", variant: "raised", size: "md" },
};

export const Primary: Story = {
  args: { children: "Get Started", variant: "primary" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="raised">Raised</Button>
      <Button variant="flat">Flat</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="pill">Pill</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { children: "Loading...", variant: "primary", loading: true },
};
