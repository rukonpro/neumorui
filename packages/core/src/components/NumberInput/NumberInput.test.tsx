import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("renders with label and default value", () => {
    render(<NumberInput label="Qty" defaultValue={5} />);
    expect(screen.getByText("Qty")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  it("increments on plus click", () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Increase"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("decrements on minus click", () => {
    const onChange = vi.fn();
    render(<NumberInput defaultValue={3} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Decrease"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("respects min/max bounds", () => {
    render(<NumberInput defaultValue={5} min={0} max={5} />);
    const increaseBtn = screen.getByLabelText("Increase");
    expect(increaseBtn).toBeDisabled();
  });
});
