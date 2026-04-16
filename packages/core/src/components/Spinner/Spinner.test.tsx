import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Spinner label="Loading" />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders variant", () => {
    render(<Spinner variant="success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
