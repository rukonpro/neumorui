import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BarChart } from "./BarChart";

const data = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 70 },
  { label: "Wed", value: 55 },
];

describe("BarChart", () => {
  it("renders all bar labels", () => {
    render(<BarChart data={data} />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });

  it("renders correct number of bars", () => {
    render(<BarChart data={data} />);
    expect(screen.getByTestId("bar-0")).toBeInTheDocument();
    expect(screen.getByTestId("bar-1")).toBeInTheDocument();
    expect(screen.getByTestId("bar-2")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<BarChart data={data} title="Revenue" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });
});
