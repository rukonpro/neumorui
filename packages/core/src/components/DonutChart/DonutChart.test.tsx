import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DonutChart } from "./DonutChart";

const segments = [
  { label: "Direct", value: 42, color: "#6c7ef8" },
  { label: "Social", value: 28, color: "#f79548" },
];

describe("DonutChart", () => {
  it("renders segment labels in the legend", () => {
    render(<DonutChart segments={segments} />);
    expect(screen.getByText("Direct")).toBeInTheDocument();
    expect(screen.getByText("Social")).toBeInTheDocument();
  });

  it("renders center value and label", () => {
    render(<DonutChart segments={segments} centerValue="70" centerLabel="Total" />);
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("renders SVG with circles", () => {
    const { container } = render(<DonutChart segments={segments} />);
    const circles = container.querySelectorAll("circle");
    // 1 background + 2 segments
    expect(circles.length).toBe(3);
  });
});
