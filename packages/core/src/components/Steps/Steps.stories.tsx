import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from "./Steps";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {
    current: 1,
    steps: [
      { title: "Account", description: "Create your account" },
      { title: "Profile", description: "Set up profile" },
      { title: "Review", description: "Review and submit" },
    ],
  },
};

export const Completed: Story = {
  args: {
    current: 3,
    steps: [
      { title: "Step 1" },
      { title: "Step 2" },
      { title: "Step 3" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    current: 1,
    direction: "vertical",
    steps: [
      { title: "Account", description: "Create account" },
      { title: "Profile", description: "Add details" },
      { title: "Done", description: "All set!" },
    ],
  },
};
