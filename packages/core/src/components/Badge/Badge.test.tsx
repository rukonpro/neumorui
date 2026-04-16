import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders with variant", () => {
    render(<Badge variant="success">OK</Badge>);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("renders dot when dot prop is true", () => {
    const { container } = render(<Badge dot>Live</Badge>);
    const dot = container.querySelector("span > span");
    expect(dot).not.toBeNull();
  });
});
