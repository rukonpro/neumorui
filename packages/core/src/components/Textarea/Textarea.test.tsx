import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Notes" />);
    expect(screen.getByPlaceholderText("Notes")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByText("Bio")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<Textarea placeholder="x" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("x"), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<Textarea placeholder="x" error="Too short" />);
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea placeholder="x" disabled />);
    expect(screen.getByPlaceholderText("x")).toBeDisabled();
  });
});
