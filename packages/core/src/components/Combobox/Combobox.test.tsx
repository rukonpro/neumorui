import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Combobox } from "./Combobox";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

describe("Combobox", () => {
  it("renders placeholder", () => {
    render(<Combobox options={options} placeholder="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Combobox options={options} label="Flavor" />);
    expect(screen.getByText("Flavor")).toBeInTheDocument();
  });

  it("renders selected value label", () => {
    render(<Combobox options={options} value="b" />);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
