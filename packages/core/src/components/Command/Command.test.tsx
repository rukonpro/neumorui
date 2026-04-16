import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Command } from "./Command";

const items = [
  { value: "new", label: "New file" },
  { value: "open", label: "Open file" },
];

describe("Command", () => {
  it("renders items and placeholder when open", () => {
    render(<Command open items={items} placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("New file")).toBeInTheDocument();
    expect(screen.getByText("Open file")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(<Command open={false} items={items} placeholder="Search..." />);
    expect(screen.queryByPlaceholderText("Search...")).toBeNull();
  });
});
