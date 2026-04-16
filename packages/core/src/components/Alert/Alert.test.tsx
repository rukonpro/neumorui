import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Alert title="Heads up">Body</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(
      <Alert onClose={onClose} title="T">
        body
      </Alert>
    );
    fireEvent.click(screen.getByLabelText("Close alert"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has role alert", () => {
    render(<Alert>hello</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders variant (danger)", () => {
    render(<Alert variant="danger">oops</Alert>);
    expect(screen.getByText("oops")).toBeInTheDocument();
  });
});
