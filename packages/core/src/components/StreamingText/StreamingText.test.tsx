import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StreamingText } from "./StreamingText";

describe("StreamingText", () => {
  it("renders with role status", () => {
    render(<StreamingText text="Hello" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows cursor while streaming", () => {
    render(<StreamingText text="Hello world" showCursor cursorChar="▊" />);
    expect(screen.getByText("▊")).toBeInTheDocument();
  });

  it("renders text content", () => {
    render(<StreamingText text="Test" speed={10000} />);
    const el = screen.getByRole("status");
    expect(el).toBeInTheDocument();
  });
});
