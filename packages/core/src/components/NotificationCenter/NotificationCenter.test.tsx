import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NotificationCenter } from "./NotificationCenter";

const notifications = [
  { id: "1", title: "New order", time: "2m ago" },
  { id: "2", title: "Comment", time: "5m ago", read: true },
];

describe("NotificationCenter", () => {
  it("renders trigger button", () => {
    render(<NotificationCenter notifications={notifications} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows badge for unread count", () => {
    render(<NotificationCenter notifications={notifications} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("opens panel on click and shows notifications", () => {
    render(<NotificationCenter notifications={notifications} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("New order")).toBeInTheDocument();
    expect(screen.getByText("Comment")).toBeInTheDocument();
  });
});
