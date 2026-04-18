import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PinInput } from "./PinInput";

describe("PinInput", () => {
  it("renders correct number of inputs", () => {
    render(<PinInput length={6} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  it("renders with label", () => {
    render(<PinInput label="Enter PIN" />);
    expect(screen.getByText("Enter PIN")).toBeInTheDocument();
  });

  it("calls onComplete when all digits filled", () => {
    const onComplete = vi.fn();
    render(<PinInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("shows error message", () => {
    render(<PinInput error="Wrong PIN" />);
    expect(screen.getByText("Wrong PIN")).toBeInTheDocument();
  });
});
