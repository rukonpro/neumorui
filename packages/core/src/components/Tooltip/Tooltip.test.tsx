import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders the trigger child", () => {
    render(
      <Tooltip content="Hello">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not render tooltip content until triggered", () => {
    render(
      <Tooltip content="Tip">
        <button>Target</button>
      </Tooltip>
    );
    // Content is in a portal and only visible when open; it should not exist initially
    expect(screen.queryByText("Tip")).toBeNull();
  });
});
