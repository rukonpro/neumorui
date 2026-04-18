import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const SheetDemo = ({ side = "bottom" as const, title = "Sheet Title" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          cursor: "pointer",
          fontWeight: 700,
          color: "var(--neu-text-primary)",
        }}
      >
        Open {side} sheet
      </button>
      <Sheet open={open} onOpenChange={setOpen} side={side} title={title} description="This is a sheet description.">
        <p style={{ color: "var(--neu-text-secondary)" }}>Sheet content goes here.</p>
      </Sheet>
    </div>
  );
};

export const Bottom: Story = {
  render: () => <SheetDemo side="bottom" title="Bottom Sheet" />,
};

export const Right: Story = {
  render: () => <SheetDemo side="right" title="Right Sheet" />,
};

export const Left: Story = {
  render: () => <SheetDemo side="left" title="Left Sheet" />,
};
