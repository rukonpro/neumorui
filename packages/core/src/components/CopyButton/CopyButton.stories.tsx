import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: { text: "npm install neumorui" },
};

export const IconOnly: Story = {
  args: { text: "hello world", variant: "icon" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <CopyButton text="raised" variant="raised" />
      <CopyButton text="flat" variant="flat" label="Flat" />
      <CopyButton text="icon" variant="icon" />
    </div>
  ),
};
