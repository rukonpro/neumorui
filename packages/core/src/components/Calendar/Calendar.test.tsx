import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("renders a grid", () => {
    render(<Calendar mode="single" />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("renders day cells", () => {
    const { container } = render(<Calendar mode="single" />);
    // react-day-picker renders a table with tbody
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
