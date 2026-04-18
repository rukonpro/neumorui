import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders key text", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });

  it("renders as kbd element", () => {
    const { container } = render(<Kbd>K</Kbd>);
    expect(container.querySelector("kbd")).toBeInTheDocument();
  });

  it("applies size styles", () => {
    const { container } = render(<Kbd size="lg">Enter</Kbd>);
    const kbd = container.querySelector("kbd") as HTMLElement;
    expect(kbd.style.fontSize).toBe("13px");
  });
});
