import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaults = {
    open: true,
    onOpenChange: vi.fn(),
    title: "Save changes?",
    description: "You have unsaved changes.",
    onConfirm: vi.fn(),
  };

  it("renders when open", () => {
    render(<ConfirmDialog {...defaults} />);
    expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
    expect(screen.getByText("Save changes?")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<ConfirmDialog {...defaults} open={false} />);
    expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm on confirm click", () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaults} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByTestId("confirm-confirm-btn"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel on cancel click", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaults} onCancel={onCancel} />);
    fireEvent.click(screen.getByTestId("confirm-cancel-btn"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("renders danger variant", () => {
    render(<ConfirmDialog {...defaults} variant="danger" title="Delete?" />);
    expect(screen.getByText("Delete?")).toBeInTheDocument();
  });

  it("renders input and requires match value", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        {...defaults}
        onConfirm={onConfirm}
        input={{ placeholder: 'Type "DELETE"', matchValue: "DELETE" }}
      />
    );
    const input = screen.getByTestId("confirm-input");
    expect(input).toBeInTheDocument();
    // Confirm should be disabled initially
    fireEvent.click(screen.getByTestId("confirm-confirm-btn"));
    expect(onConfirm).not.toHaveBeenCalled();
    // Type the match value
    fireEvent.change(input, { target: { value: "DELETE" } });
    fireEvent.click(screen.getByTestId("confirm-confirm-btn"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
