import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders placeholder when no value", () => {
    render(<DatePicker placeholder="Pick date" />);
    expect(screen.getByText("Pick date")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<DatePicker label="Start" />);
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("renders formatted value when a date is provided", () => {
    const d = new Date(2024, 0, 15);
    render(<DatePicker value={d} />);
    // default dateFormat is "PP" which outputs something like "Jan 15, 2024"
    expect(screen.getByText(/Jan/)).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<DatePicker disabled placeholder="Pick" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
