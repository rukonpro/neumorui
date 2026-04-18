import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LinkPreview } from "./LinkPreview";

describe("LinkPreview", () => {
  it("renders the link text", () => {
    render(
      <LinkPreview href="https://example.com" title="Example">
        Click here
      </LinkPreview>
    );
    expect(screen.getByText("Click here")).toBeInTheDocument();
  });

  it("renders an anchor tag with correct href", () => {
    render(
      <LinkPreview href="https://example.com" title="Test">
        Link
      </LinkPreview>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });

  it("has target _blank", () => {
    render(
      <LinkPreview href="https://example.com" title="Test">
        Link
      </LinkPreview>
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
