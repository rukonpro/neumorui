import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContextMenu } from "./ContextMenu";

describe("ContextMenu", () => {
  const items = [
    { label: "Edit", onSelect: vi.fn() },
    { separator: true },
    { label: "Delete", danger: true },
  ];

  it("renders trigger", () => {
    render(<ContextMenu trigger={<span>Right-click</span>} items={items} />);
    expect(screen.getByText("Right-click")).toBeInTheDocument();
  });

  it("shows menu on right-click", () => {
    render(<ContextMenu trigger={<span>Right-click</span>} items={items} />);
    fireEvent.contextMenu(screen.getByText("Right-click"));
    expect(screen.getByTestId("context-menu")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", () => {
    render(<ContextMenu trigger={<span>Right-click</span>} items={items} />);
    fireEvent.contextMenu(screen.getByText("Right-click"));
    fireEvent.click(screen.getByText("Edit"));
    expect(items[0].onSelect).toHaveBeenCalled();
  });
});
