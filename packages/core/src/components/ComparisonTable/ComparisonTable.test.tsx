import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ComparisonTable } from "./ComparisonTable";

const features = ["Components", "Dark mode", "Storybook"];
const plans = [
  { name: "Free", values: ["10", false, false] as (string | boolean)[] },
  { name: "Pro", highlight: true, values: ["30+", true, true] as (string | boolean)[] },
  { name: "Team", values: ["30+", true, true] as (string | boolean)[] },
];

describe("ComparisonTable", () => {
  it("renders the table", () => {
    render(<ComparisonTable features={features} plans={plans} />);
    expect(screen.getByTestId("comparison-table")).toBeInTheDocument();
  });

  it("renders feature names", () => {
    render(<ComparisonTable features={features} plans={plans} />);
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  it("renders plan headers", () => {
    render(<ComparisonTable features={features} plans={plans} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("renders string values", () => {
    render(<ComparisonTable features={features} plans={plans} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getAllByText("30+").length).toBe(2);
  });
});
