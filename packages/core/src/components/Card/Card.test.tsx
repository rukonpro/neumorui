import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello card</Card>);
    expect(screen.getByText("Hello card")).toBeInTheDocument();
  });

  it("applies padding size (lg)", () => {
    const { container } = render(<Card padding="lg">x</Card>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.padding).toBe("2rem");
  });

  it("renders variant (inset)", () => {
    render(<Card variant="inset">inset content</Card>);
    expect(screen.getByText("inset content")).toBeInTheDocument();
  });
});
