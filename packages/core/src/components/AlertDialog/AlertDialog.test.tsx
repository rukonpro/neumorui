import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertDialog, AlertDialogProvider, useAlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<AlertDialog open={false} message="Test" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders message when open", () => {
    render(<AlertDialog open message="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<AlertDialog open title="Alert Title" message="Msg" />);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });

  it("calls onOk and onClose on OK click", () => {
    const onOk = vi.fn();
    const onClose = vi.fn();
    render(<AlertDialog open message="Test" onOk={onOk} onClose={onClose} />);
    fireEvent.click(screen.getByText("OK"));
    expect(onOk).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("shows cancel button when cancelText provided", () => {
    render(<AlertDialog open message="Test" cancelText="Cancel" />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});

describe("useAlertDialog", () => {
  function TestComponent() {
    const { alert } = useAlertDialog();
    return <button onClick={() => alert({ message: "Hook alert!" })}>Show</button>;
  }

  it("shows alert via hook", () => {
    render(
      <AlertDialogProvider>
        <TestComponent />
      </AlertDialogProvider>
    );
    fireEvent.click(screen.getByText("Show"));
    expect(screen.getByText("Hook alert!")).toBeInTheDocument();
  });
});
