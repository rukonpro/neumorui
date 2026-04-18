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
    // Actions container is always in DOM but items have pointer-events: none when closed
    const actionsContainer = screen.getByTestId("speed-dial-actions");
    expect(actionsContainer).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Toggle actions"));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("calls action onClick and closes", () => {
    const handleEdit = vi.fn();
    render(<SpeedDial actions={[{ label: "Edit", icon: "✏️", onClick: handleEdit }]} />);
    fireEvent.click(screen.getByLabelText("Toggle actions"));
    fireEvent.click(screen.getByLabelText("Edit"));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
