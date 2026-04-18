import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableOfContents } from "./TableOfContents";

const items = [
  { id: "intro", text: "Introduction", level: 1 },
  { id: "setup", text: "Setup", level: 2 },
  { id: "usage", text: "Usage", level: 2 },
];

describe("TableOfContents", () => {
  it("renders all items", () => {
    render(<TableOfContents items={items} />);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(screen.getByText("Usage")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<TableOfContents items={items} title="Contents" />);
    expect(screen.getByText("Contents")).toBeInTheDocument();
  });

  it("shows active state for the controlled activeId", () => {
    render(<TableOfContents items={items} activeId="setup" />);
    const setupButton = screen.getByText("Setup");
    expect(setupButton).toHaveStyle({ fontWeight: 700 });
  });

  it("renders the default title when none is provided", () => {
    render(<TableOfContents items={items} />);
    expect(screen.getByText("On this page")).toBeInTheDocument();
  });
});
