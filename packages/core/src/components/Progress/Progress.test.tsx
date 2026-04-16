import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders as progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow", () => {
    render(<Progress value={42} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "42"
    );
  });

  it("renders label and percentage when requested", () => {
    render(<Progress value={30} label="Uploading" showLabel />);
    expect(screen.getByText("Uploading")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("renders variant", () => {
    render(<Progress value={60} variant="success" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
