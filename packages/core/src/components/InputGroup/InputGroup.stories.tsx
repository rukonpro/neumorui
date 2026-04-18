import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup } from "./InputGroup";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const WithLeftAddon: Story = {
  args: { label: "Website", leftAddon: "https://", placeholder: "example.com" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <InputGroup {...args} />
    </div>
  ),
};

export const WithRightAddon: Story = {
  args: { label: "Email", rightAddon: "@gmail.com", placeholder: "username" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <InputGroup {...args} />
    </div>
  ),
};

export const BothAddons: Story = {
  args: { label: "Price", leftAddon: "$", rightAddon: ".00", placeholder: "0" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <InputGroup {...args} />
    </div>
  ),
};
