import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LineChart } from "./LineChart";

const data = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 480 },
  { label: "Wed", value: 390 },
];

describe("LineChart", () => {
  it("renders svg element", () => {
    render(<LineChart data={data} />);
    expect(screen.getByTestId("line-chart-svg")).toBeInTheDocument();
  });

  it("renders labels", () => {
    render(<LineChart data={data} />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });

  it("renders dots when showDots is true", () => {
    render(<LineChart data={data} showDots />);
    expect(screen.getByTestId("dot-0")).toBeInTheDocument();
    expect(screen.getByTestId("dot-1")).toBeInTheDocument();
    expect(screen.getByTestId("dot-2")).toBeInTheDocument();
  });

  it("hides dots when showDots is false", () => {
    render(<LineChart data={data} showDots={false} />);
    expect(screen.queryByTestId("dot-0")).not.toBeInTheDocument();
  });
});
