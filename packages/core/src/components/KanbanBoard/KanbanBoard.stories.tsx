import type { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard } from "./KanbanBoard";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
};
export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    columns: [
      {
        id: "todo",
        title: "To Do",
        count: 3,
        items: [
          { id: "1", title: "Design system audit", tag: { label: "Design", variant: "blue" }, assignee: "Rafat" },
          { id: "2", title: "Token documentation", tag: { label: "Docs", variant: "yellow" }, assignee: "Amina" },
          { id: "3", title: "Accessibility review", tag: { label: "A11y", variant: "green" }, assignee: "Karim" },
        ],
      },
      {
        id: "progress",
        title: "In Progress",
        count: 2,
        items: [
          { id: "4", title: "Component library", tag: { label: "Dev", variant: "blue" }, progress: 65 },
          { id: "5", title: "Dark mode support", tag: { label: "Design", variant: "green" }, progress: 80 },
        ],
      },
      {
        id: "done",
        title: "Done",
        count: 2,
        items: [
          { id: "6", title: "Initial wireframes", tag: { label: "Completed", variant: "green" } },
          { id: "7", title: "Color token setup", tag: { label: "Completed", variant: "green" } },
        ],
      },
    ],
  },
};
