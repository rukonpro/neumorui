import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

describe("MultiSelect", () => {
  it("renders the placeholder", () => {
    render(<MultiSelect options={options} placeholder="Pick frameworks" />);
    expect(screen.getByText("Pick frameworks")).toBeInTheDocument();
  });

  it("opens the dropdown on click", () => {
    render(<MultiSelect options={options} />);
    fireEvent.click(screen.getByText("Select..."));
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("selects an option when clicked", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByText("Select..."));
    fireEvent.click(screen.getByText("React"));
    expect(handleChange).toHaveBeenCalledWith(["react"]);
  });

  it("renders the label when provided", () => {
    render(<MultiSelect options={options} label="Frameworks" />);
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
  });
});
