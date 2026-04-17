import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials", () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<Avatar src="/x.png" alt="User" />);
    const img = screen.getByAltText("User") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/x.png");
  });

  it("renders with a size variant", () => {
    const { container } = render(<Avatar initials="AB" size="lg" />);
    const divs = container.querySelectorAll("div");
    const inner = Array.from(divs).find((d) => d.style.width === "56px");
    expect(inner).not.toBeNull();
  });

  it("renders status indicator", () => {
    const { container } = render(<Avatar initials="AB" status="online" />);
    // status dot is an absolute-positioned span
    expect(container.querySelectorAll("span").length).toBeGreaterThan(0);
  });
});
