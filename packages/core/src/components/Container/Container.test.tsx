import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><p>Content</p></Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies correct max-width for size", () => {
    const { container } = render(<Container size="sm"><div /></Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.maxWidth).toBe("640px");
  });

  it("centers by default", () => {
    const { container } = render(<Container><div /></Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.marginLeft).toBe("auto");
    expect(el.style.marginRight).toBe("auto");
  });
});
