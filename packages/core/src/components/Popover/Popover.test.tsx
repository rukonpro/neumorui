import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders the trigger", () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>content</p>
      </Popover>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("renders content when controlled open is true", () => {
    render(
      <Popover open trigger={<button>Open</button>}>
        <p>Popover body</p>
      </Popover>
    );
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });
});
