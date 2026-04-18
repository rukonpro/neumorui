import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Chip",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Chip variant="raised">Raised</Chip>
      <Chip variant="outlined">Outlined</Chip>
      <Chip variant="filled">Filled</Chip>
    </div>
  ),
};

export const ColorsAndRemovable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Chip color="primary" removable>Primary</Chip>
      <Chip color="success" removable>Success</Chip>
      <Chip color="danger" removable>Danger</Chip>
      <Chip color="warning" removable>Warning</Chip>
      <Chip selected>Selected</Chip>
      <Chip disabled>Disabled</Chip>
    </div>
  ),
};
