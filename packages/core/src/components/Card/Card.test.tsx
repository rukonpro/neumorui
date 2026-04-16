import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello card</Card>);
    expect(screen.getByText("Hello card")).toBeInTheDocument();
  });

  it("applies padding size class (lg)", () => {
    const { container } = render(<Card padding="lg">x</Card>);
    expect(container.querySelector(".p-6")).not.toBeNull();
  });

  it("renders variant (inset)", () => {
    render(<Card variant="inset">inset content</Card>);
    expect(screen.getByText("inset content")).toBeInTheDocument();
  });
});
