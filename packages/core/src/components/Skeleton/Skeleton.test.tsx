import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders rect variant by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector(".neu-shimmer")).not.toBeNull();
  });

  it("renders text variant with correct number of lines", () => {
    const { container } = render(<Skeleton variant="text" lines={4} />);
    const bars = container.querySelectorAll(".neu-shimmer");
    expect(bars.length).toBe(4);
  });

  it("renders avatar variant", () => {
    const { container } = render(<Skeleton variant="avatar" />);
    expect(container.querySelector(".rounded-full")).not.toBeNull();
  });
});
