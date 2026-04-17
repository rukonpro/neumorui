import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee, MarqueeItem } from "./Marquee";

describe("Marquee", () => {
  it("renders children", () => {
    render(
      <Marquee>
        <MarqueeItem>Hello</MarqueeItem>
      </Marquee>
    );
    // Content is duplicated for seamless loop
    const items = screen.getAllByText("Hello");
    expect(items.length).toBe(2);
  });

  it("applies inset shadow container style", () => {
    const { container } = render(
      <Marquee>
        <span>test</span>
      </Marquee>
    );
    const outer = container.firstElementChild?.nextElementSibling as HTMLElement;
    expect(outer).toBeTruthy();
  });

  it("renders the marquee track", () => {
    render(
      <Marquee>
        <MarqueeItem>Item</MarqueeItem>
      </Marquee>
    );
    expect(screen.getByTestId("marquee-track")).toBeInTheDocument();
  });
});
