import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GaugeChart } from "./GaugeChart";

describe("GaugeChart", () => {
  it("renders SVG with value", () => {
    const { container } = render(<GaugeChart value={75} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("displays value text", () => {
    render(<GaugeChart value={82} />);
    expect(screen.getByText("82")).toBeInTheDocument();
  });

  it("displays label", () => {
    render(<GaugeChart value={50} label="CPU" />);
    expect(screen.getByText("CPU")).toBeInTheDocument();
  });
});
