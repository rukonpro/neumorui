import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
];

describe("RadioGroup", () => {
  it("renders option labels", () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("renders group label", () => {
    render(<RadioGroup options={options} label="Fruits" />);
    expect(screen.getByText("Fruits")).toBeInTheDocument();
  });

  it("renders radio items with role radio", () => {
    render(<RadioGroup options={options} />);
    expect(screen.getAllByRole("radio").length).toBe(2);
  });

  it("disables all radios when disabled prop is true", () => {
    render(<RadioGroup options={options} disabled />);
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toBeDisabled();
    });
  });
});
