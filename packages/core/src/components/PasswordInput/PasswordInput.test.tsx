import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("renders with label", () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("toggles visibility on eye button click", () => {
    render(<PasswordInput label="Password" placeholder="Enter" />);
    const input = screen.getByPlaceholderText("Enter");
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByLabelText("Show password"));
    expect(input).toHaveAttribute("type", "text");
  });

  it("shows strength meter when enabled", () => {
    render(<PasswordInput showStrength placeholder="Enter" />);
    const input = screen.getByPlaceholderText("Enter");
    fireEvent.change(input, { target: { value: "Str0ng!Pass" } });
    expect(screen.getByText(/strong|medium|weak/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<PasswordInput error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
