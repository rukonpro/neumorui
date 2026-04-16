import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { value: "a", title: "Item A", content: "Content A" },
  { value: "b", title: "Item B", content: "Content B" },
];

describe("Accordion", () => {
  it("renders titles", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
  });

  it("renders default open content when defaultValue is set", () => {
    render(<Accordion items={items} defaultValue="a" />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("renders as multiple type", () => {
    render(<Accordion items={items} type="multiple" defaultValue={["a", "b"]} />);
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });
});
