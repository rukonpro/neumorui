import type { Meta, StoryObj } from "@storybook/react";
import { LoadingOverlay } from "./LoadingOverlay";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Components/LoadingOverlay",
  component: LoadingOverlay,
};
export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Loading: Story = {
  args: {
    loading: true,
    message: "Fetching data...",
    children: (
      <div style={{ padding: "40px", textAlign: "center", color: "var(--neu-text-secondary)" }}>
        Content loaded
      </div>
    ),
  },
};

export const NotLoading: Story = {
  args: {
    loading: false,
    children: (
      <div style={{ padding: "40px", textAlign: "center", color: "var(--neu-text-secondary)" }}>
        Content loaded
      </div>
    ),
  },
};
