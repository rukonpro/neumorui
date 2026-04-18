import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadarChart } from "./RadarChart";

const data = [
  { label: "Speed", value: 80 },
  { label: "Power", value: 60 },
  { label: "Defense", value: 70 },
  { label: "Agility", value: 90 },
];

describe("RadarChart", () => {
  it("renders SVG", () => {
    const { container } = render(<RadarChart data={data} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders labels", () => {
    render(<RadarChart data={data} showLabels />);
    expect(screen.getByText("Speed")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();
  });

  it("returns null for less than 3 data points", () => {
    const { container } = render(<RadarChart data={[{ label: "A", value: 1 }, { label: "B", value: 2 }]} />);
    expect(container.innerHTML).toBe("");
  });
});
