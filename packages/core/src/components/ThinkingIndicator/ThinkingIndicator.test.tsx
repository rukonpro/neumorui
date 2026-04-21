import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThinkingIndicator } from "./ThinkingIndicator";

describe("ThinkingIndicator", () => {
  it("renders with default props", () => {
    render(<ThinkingIndicator />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<ThinkingIndicator label="Thinking..." />);
    expect(screen.getByText("Thinking...")).toBeInTheDocument();
  });

  it("renders three dots", () => {
    const { container } = render(<ThinkingIndicator />);
    const dots = container.querySelectorAll("span[style*='border-radius']");
    expect(dots.length).toBe(3);
  });

  it("renders avatar when provided", () => {
    const { container } = render(<ThinkingIndicator avatar="https://example.com/avatar.jpg" />);
    expect(container.querySelector("img")).toBeInTheDocument();
  });
});
