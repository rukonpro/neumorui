import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    variant: { control: "select", options: ["raised", "inset", "flat"] },
    padding: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Raised: Story = {
  args: {
    variant: "raised",
    padding: "md",
    children: "Raised neumorphic card with soft shadow.",
    style: { width: 320 },
  },
};

export const Inset: Story = {
  args: { variant: "inset", children: "Inset (pressed-in) card.", style: { width: 320 } },
};

export const Flat: Story = {
  args: { variant: "flat", children: "Flat card with subtle border.", style: { width: 320 } },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <Card variant="raised" style={{ width: 220 }}>
        Raised
      </Card>
      <Card variant="inset" style={{ width: 220 }}>
        Inset
      </Card>
      <Card variant="flat" style={{ width: 220 }}>
        Flat
      </Card>
    </div>
  ),
};
