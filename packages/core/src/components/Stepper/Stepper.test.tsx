import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stepper } from "./Stepper";

describe("Stepper", () => {
  const steps = [
    { label: "Step One", description: "First step", status: "done" as const },
    { label: "Step Two", status: "active" as const },
    { label: "Step Three", status: "pending" as const },
  ];

  it("renders all steps", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();
    expect(screen.getByText("Step Three")).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText("First step")).toBeInTheDocument();
  });

  it("shows status badges for done and active", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
