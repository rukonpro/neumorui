import type { Meta, StoryObj } from "@storybook/react";
import { ActivityFeed } from "./ActivityFeed";

const meta: Meta<typeof ActivityFeed> = {
  title: "Components/ActivityFeed",
  component: ActivityFeed,
};
export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const Default: Story = {
  args: {
    items: [
      { user: "Rafat", action: "pushed to main", time: "2 min ago" },
      { user: "Amina", action: "merged PR #42", time: "15 min ago", color: "var(--neu-success)" },
      { user: "CI/CD", action: "build failed", time: "32 min ago", color: "var(--neu-danger)" },
      { user: "Karim", action: "opened issue #88", time: "1 hr ago", color: "var(--neu-warning)" },
    ],
    onLoadMore: () => alert("Load more"),
  },
};
