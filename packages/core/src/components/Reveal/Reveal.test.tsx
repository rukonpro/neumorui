import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <span>Revealed content</span>
      </Reveal>
    );
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });

  it("applies the neu-reveal class", () => {
    const { container } = render(
      <Reveal>
        <span>hi</span>
      </Reveal>
    );
    expect(container.querySelector(".neu-reveal")).not.toBeNull();
  });
});
