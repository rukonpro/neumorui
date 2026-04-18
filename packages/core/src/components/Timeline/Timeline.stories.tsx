import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const sampleItems = [
  { title: "Project Started", description: "Initial planning and design phase.", date: "Jan 2024" },
  { title: "Development", description: "Core features implemented.", date: "Mar 2024" },
  { title: "Beta Release", description: "Public beta launched for testing.", date: "Jun 2024" },
  { title: "Launch", description: "Official v1.0 release.", date: "Sep 2024" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Alternating: Story = {
  args: {
    items: sampleItems,
    alternating: true,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    orientation: "horizontal",
  },
};
