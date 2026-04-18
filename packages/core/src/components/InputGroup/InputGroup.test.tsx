import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InputGroup } from "./InputGroup";

describe("InputGroup", () => {
  it("renders with label", () => {
    render(<InputGroup label="Website" placeholder="example.com" />);
    expect(screen.getByText("Website")).toBeInTheDocument();
  });

  it("renders left addon", () => {
    render(<InputGroup leftAddon="https://" placeholder="example.com" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
  });

  it("renders right addon", () => {
    render(<InputGroup rightAddon=".com" placeholder="username" />);
    expect(screen.getByText(".com")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<InputGroup error="Required" placeholder="x" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
