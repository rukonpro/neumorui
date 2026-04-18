import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea><p>Content</p></ScrollArea>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies maxHeight", () => {
    const { container } = render(<ScrollArea maxHeight={200}><div /></ScrollArea>);
    const scrollable = container.querySelector("[style*='max-height']") as HTMLElement;
    expect(scrollable).toBeInTheDocument();
  });

  it("hides scrollbar when hideScrollbar is true", () => {
    const { container } = render(<ScrollArea hideScrollbar><div /></ScrollArea>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.scrollbarWidth).toBe("none");
  });
});
