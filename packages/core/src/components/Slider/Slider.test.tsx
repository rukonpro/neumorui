import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders without crashing", () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Slider label="Volume" defaultValue={[20]} />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });

  it("shows value when showValue is true", () => {
    render(<Slider defaultValue={[37]} showValue />);
    expect(screen.getByText("37")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Slider disabled defaultValue={[10]} />);
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });
});
