import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio><span>Content</span></AspectRatio>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies 16:9 ratio by default", () => {
    const { container } = render(<AspectRatio><div /></AspectRatio>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.paddingBottom).toContain("56.25");
  });

  it("applies custom ratio", () => {
    const { container } = render(<AspectRatio ratio={1}><div /></AspectRatio>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.paddingBottom).toBe("100%");
  });
});
