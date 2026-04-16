import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders label", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByText("Accept")).toBeInTheDocument();
  });

  it("calls onCheckedChange when clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Agree" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Checkbox label="Off" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
