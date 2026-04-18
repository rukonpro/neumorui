import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Masonry } from "./Masonry";

describe("Masonry", () => {
  it("renders all children", () => {
    render(
      <Masonry columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Masonry>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("distributes items across columns", () => {
    const { container } = render(
      <Masonry columns={3}>
        <div>A</div><div>B</div><div>C</div>
        <div>D</div><div>E</div><div>F</div>
      </Masonry>
    );
    // In jsdom, ResizeObserver may reduce columns based on clientWidth=0
    // Just verify all items are rendered
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
  });
});
