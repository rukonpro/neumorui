import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NotificationCard } from "./NotificationCard";

describe("NotificationCard", () => {
  it("renders title and description", () => {
    render(<NotificationCard title="New order" description="Order #123" />);
    expect(screen.getByText("New order")).toBeInTheDocument();
    expect(screen.getByText("Order #123")).toBeInTheDocument();
  });

  it("renders time", () => {
    render(<NotificationCard title="Test" time="2m ago" />);
    expect(screen.getByText("2m ago")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss clicked", () => {
    const onDismiss = vi.fn();
    render(<NotificationCard title="Test" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalled();
  });
});
