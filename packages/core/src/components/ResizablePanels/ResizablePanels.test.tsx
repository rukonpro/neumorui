import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResizablePanels } from "./ResizablePanels";

describe("ResizablePanels", () => {
  it("renders both panels", () => {
    render(
      <ResizablePanels>
        <div>Panel A</div>
        <div>Panel B</div>
      </ResizablePanels>
    );
    expect(screen.getByText("Panel A")).toBeInTheDocument();
    expect(screen.getByText("Panel B")).toBeInTheDocument();
  });

  it("renders with default 50% size", () => {
    const { container } = render(
      <ResizablePanels>
        <div>A</div>
        <div>B</div>
      </ResizablePanels>
    );
    const firstPanel = container.querySelector("[style*='width: 50%']") as HTMLElement;
    expect(firstPanel).toBeInTheDocument();
  });
});
