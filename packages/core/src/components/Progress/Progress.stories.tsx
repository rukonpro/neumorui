import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <Progress value={40} showLabel label="Default" />
      <Progress value={70} variant="success" showLabel label="Success" />
      <Progress value={30} variant="danger" showLabel label="Danger" />
      <Progress value={55} variant="warning" showLabel label="Warning" />
    </div>
  ),
};
