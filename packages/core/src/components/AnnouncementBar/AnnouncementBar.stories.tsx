import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBar } from "./AnnouncementBar";

const meta: Meta<typeof AnnouncementBar> = {
  title: "Components/AnnouncementBar",
  component: AnnouncementBar,
};
export default meta;
type Story = StoryObj<typeof AnnouncementBar>;

export const Clay: Story = {
  args: {
    children: "New feature available! Check out the latest update.",
    icon: "🎉",
    dismissible: true,
  },
};

export const Gradient: Story = {
  args: {
    children: "Limited offer: 50% off premium plan!",
    variant: "gradient",
    icon: "🔥",
    dismissible: true,
  },
};
