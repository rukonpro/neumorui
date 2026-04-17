import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heatmap } from "./Heatmap";

describe("Heatmap", () => {
  it("renders the grid", () => {
    const data = Array.from({ length: 91 }, () => Math.random());
    render(<Heatmap data={data} />);
    expect(screen.getByTestId("heatmap-grid")).toBeInTheDocument();
  });

  it("renders correct number of cells", () => {
    const data = Array.from({ length: 91 }, () => 0.5);
    render(<Heatmap data={data} cols={13} rows={7} />);
    expect(screen.getByTestId("heatmap-cell-0")).toBeInTheDocument();
    expect(screen.getByTestId("heatmap-cell-90")).toBeInTheDocument();
  });

  it("renders legend", () => {
    render(<Heatmap data={[0.1, 0.5, 0.9]} cols={3} rows={1} />);
    expect(screen.getByText("Less")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });
});
