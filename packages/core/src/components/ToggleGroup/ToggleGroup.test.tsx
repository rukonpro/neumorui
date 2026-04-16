import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToggleGroup } from "./ToggleGroup";

const options = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];

describe("ToggleGroup", () => {
  it("renders options (single)", () => {
    render(<ToggleGroup type="single" options={options} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("renders options (multiple)", () => {
    render(<ToggleGroup type="multiple" options={options} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("disables items when disabled prop is true", () => {
    render(<ToggleGroup type="single" options={options} disabled />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toBeDisabled();
    });
  });
});
