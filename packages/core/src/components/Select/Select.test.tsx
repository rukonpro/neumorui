import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

describe("Select", () => {
  it("renders placeholder", () => {
    render(<Select options={options} placeholder="Pick" />);
    expect(screen.getByText("Pick")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Select options={options} label="Choice" />);
    expect(screen.getByText("Choice")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Select options={options} disabled />);
    // Radix select trigger has role combobox
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
