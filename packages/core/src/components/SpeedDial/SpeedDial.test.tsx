import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SpeedDial } from "./SpeedDial";

const actions = [
  { label: "Edit", icon: "✏️" },
  { label: "Share", icon: "🔗" },
];

describe("SpeedDial", () => {
  it("renders the main FAB button", () => {
    render(<SpeedDial actions={actions} />);
    expect(screen.getByLabelText("Toggle actions")).toBeInTheDocument();
  });

  it("shows actions when toggled open", () => {
    render(<SpeedDial actions={actions} />);
    expect(screen.queryByTestId("speed-dial-actions")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Toggle actions"));
    expect(screen.getByTestId("speed-dial-actions")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("calls action onClick and closes", () => {
    const handleEdit = vi.fn();
    render(<SpeedDial actions={[{ label: "Edit", icon: "✏️", onClick: handleEdit }]} />);
    fireEvent.click(screen.getByLabelText("Toggle actions"));
    fireEvent.click(screen.getByLabelText("Edit"));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
