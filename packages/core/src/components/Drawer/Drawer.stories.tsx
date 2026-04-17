import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: "Slide-in drawer panel from left, right, or bottom.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer open={open} onOpenChange={setOpen} title="Settings">
          <p>Drawer content goes here.</p>
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Left Drawer</button>
        <Drawer open={open} onOpenChange={setOpen} side="left" title="Menu">
          <p>Left drawer content.</p>
        </Drawer>
      </>
    );
  },
};

export const BottomSheet: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Bottom Sheet</button>
        <Drawer open={open} onOpenChange={setOpen} side="bottom" title="Actions">
          <p>Bottom sheet content.</p>
        </Drawer>
      </>
    );
  },
};
