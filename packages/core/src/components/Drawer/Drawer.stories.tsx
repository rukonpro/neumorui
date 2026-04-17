import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";

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
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer open={open} onOpenChange={setOpen} title="Settings">
          <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>
            This is a right drawer. Commonly used for shopping carts, details panels, or activity feeds.
          </p>
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
        <Button variant="raised" onClick={() => setOpen(true)}>
          ← Open Left Drawer
        </Button>
        <Drawer open={open} onOpenChange={setOpen} side="left" title="Menu">
          <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>
            This is a left drawer. Great for navigation panels, settings, or filters.
          </p>
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
        <Button variant="raised" onClick={() => setOpen(true)}>
          ↓ Open Bottom Sheet
        </Button>
        <Drawer open={open} onOpenChange={setOpen} side="bottom" title="Actions">
          <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
            A bottom sheet for mobile-first interactions.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={() => setOpen(false)}>
              Confirm
            </Button>
            <Button variant="raised" style={{ flex: 1 }} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Drawer>
      </>
    );
  },
};
