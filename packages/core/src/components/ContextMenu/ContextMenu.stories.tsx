import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component: "Right-click context menu with neumorphic styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {
    trigger: (
      <div
        style={{
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised)",
          cursor: "context-menu",
        }}
      >
        Right-click here
      </div>
    ),
    items: [
      { label: "Edit", onSelect: () => console.log("edit") },
      { label: "Duplicate" },
      { separator: true },
      { label: "Delete", danger: true },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <div style={{ padding: "40px" }}>Right-click me</div>,
    items: [
      { label: "Copy", icon: "📋" },
      { label: "Paste", icon: "📎" },
      { separator: true },
      { label: "Remove", icon: "🗑", danger: true },
    ],
  },
};
