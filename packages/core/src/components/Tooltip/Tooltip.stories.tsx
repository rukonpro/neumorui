import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 60, justifyContent: "center" }}>
      <Tooltip content="Top tip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tip" side="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tip" side="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};
