import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InlineMessage } from "./InlineMessage";

describe("InlineMessage", () => {
  it("renders message text", () => {
    render(<InlineMessage>This field is required.</InlineMessage>);
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("renders default icon per variant", () => {
    render(<InlineMessage variant="success">Done!</InlineMessage>);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders custom icon", () => {
    render(<InlineMessage icon="🎉">Custom!</InlineMessage>);
    expect(screen.getByText("🎉")).toBeInTheDocument();
  });
});
