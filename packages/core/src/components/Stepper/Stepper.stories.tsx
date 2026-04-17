import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: "Progress steps indicator with done, active, and pending states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const sampleSteps = [
  { label: "Account Created", description: "Sign up complete", status: "done" as const },
  { label: "Profile Setup", description: "Add your details", status: "active" as const },
  { label: "Verification", description: "Confirm your email", status: "pending" as const },
];

export const Default: Story = {
  args: { steps: sampleSteps },
};

export const Horizontal: Story = {
  args: { steps: sampleSteps, orientation: "horizontal" },
};

export const AllDone: Story = {
  args: {
    steps: [
      { label: "Step 1", status: "done" },
      { label: "Step 2", status: "done" },
      { label: "Step 3", status: "done" },
    ],
  },
};
