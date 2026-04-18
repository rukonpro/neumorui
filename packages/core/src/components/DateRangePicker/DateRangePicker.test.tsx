import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("renders the label", () => {
    render(<DateRangePicker label="Date Range" />);
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  it("opens the calendar on click", () => {
    render(<DateRangePicker />);
    fireEvent.click(screen.getByText("Select date range"));
    expect(screen.getByText("Select start date")).toBeInTheDocument();
  });

  it("shows day headers in the calendar", () => {
    render(<DateRangePicker />);
    fireEvent.click(screen.getByText("Select date range"));
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
  });

  it("renders the placeholder when no dates are selected", () => {
    render(<DateRangePicker placeholder="Pick a range" />);
    expect(screen.getByText("Pick a range")).toBeInTheDocument();
  });
});
