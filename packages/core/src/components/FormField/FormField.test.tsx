import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders label and children", () => {
    render(<FormField label="Name"><input placeholder="John" /></FormField>);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(<FormField label="Email" required><input /></FormField>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<FormField label="Name" error="Required"><input /></FormField>);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("shows helper text when no error", () => {
    render(<FormField label="Name" helperText="Optional"><input /></FormField>);
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });
});
