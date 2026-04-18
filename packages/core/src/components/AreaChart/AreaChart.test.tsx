import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AreaChart } from "./AreaChart";

const data = [
  { label: "Mon", value: 30 },
  { label: "Tue", value: 60 },
  { label: "Wed", value: 45 },
];

describe("AreaChart", () => {
  it("renders SVG with data", () => {
    const { container } = render(<AreaChart data={data} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders labels", () => {
    render(<AreaChart data={data} showLabels />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });

  it("returns null for empty data", () => {
    const { container } = render(<AreaChart data={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
