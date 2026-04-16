import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders label", () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("calls onCheckedChange when toggled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Sound" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Switch label="Off" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
