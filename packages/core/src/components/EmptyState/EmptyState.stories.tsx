import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No projects yet",
    description: "Create your first project to get started.",
    action: (
      <button
        type="button"
        style={{
          padding: "8px 20px",
          borderRadius: "10px",
          border: "none",
          background: "var(--neu-accent)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Create Project
      </button>
    ),
  },
};

export const Small: Story = {
  args: {
    title: "Empty",
    size: "sm",
  },
};
