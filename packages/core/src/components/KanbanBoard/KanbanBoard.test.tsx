import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KanbanBoard } from "./KanbanBoard";

const columns = [
  {
    id: "todo",
    title: "To Do",
    count: 2,
    items: [
      { id: "1", title: "Design system audit", tag: { label: "Design", variant: "blue" as const } },
      { id: "2", title: "Token docs", assignee: "Amina" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    count: 1,
    items: [{ id: "3", title: "Component library", progress: 65 }],
  },
];

describe("KanbanBoard", () => {
  it("renders all columns", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByTestId("kanban-col-todo")).toBeInTheDocument();
    expect(screen.getByTestId("kanban-col-progress")).toBeInTheDocument();
  });

  it("renders column titles", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders cards", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByTestId("kanban-card-1")).toBeInTheDocument();
    expect(screen.getByText("Design system audit")).toBeInTheDocument();
  });

  it("renders tag on card", () => {
    render(<KanbanBoard columns={columns} />);
    expect(screen.getByText("Design")).toBeInTheDocument();
  });
});
