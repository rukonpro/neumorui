import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders rect variant by default", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.animation).toContain("neuShimmer");
  });

  it("renders text variant with correct number of lines", () => {
    const { container } = render(<Skeleton variant="text" lines={4} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children.length).toBe(4);
  });

  it("renders avatar variant", () => {
    const { container } = render(<Skeleton variant="avatar" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderRadius).toBe("14px");
  });
});
