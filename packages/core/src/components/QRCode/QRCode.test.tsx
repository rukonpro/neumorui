import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QRCode } from "./QRCode";

describe("QRCode", () => {
  it("renders SVG", () => {
    const { container } = render(<QRCode value="test" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<QRCode value="test" label="Scan me" />);
    expect(screen.getByText("Scan me")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    const { container } = render(<QRCode value="test" size={200} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
  });
});
