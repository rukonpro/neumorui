import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sparkline } from "./Sparkline";

describe("Sparkline", () => {
  it("renders SVG", () => {
    const { container } = render(<Sparkline data={[10, 20, 30, 25]} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("returns null for less than 2 data points", () => {
    const { container } = render(<Sparkline data={[5]} />);
    expect(container.innerHTML).toBe("");
  });

  it("applies custom width and height", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} width={200} height={40} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "40");
  });
});
