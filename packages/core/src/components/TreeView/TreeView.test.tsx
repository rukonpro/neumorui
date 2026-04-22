import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TreeView } from "./TreeView";

const nodes = [
  {
    label: "src",
    icon: "F",
    children: [
      {
        label: "components",
        icon: "F",
        children: [
          { label: "Button.tsx", icon: "f" },
          { label: "Input.tsx", icon: "f" },
        ],
      },
      { label: "index.ts", icon: "f" },
    ],
  },
  { label: "package.json", icon: "f" },
];

describe("TreeView", () => {
  it("renders the tree", () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByTestId("tree-view")).toBeInTheDocument();
  });

  it("renders root nodes", () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("package.json")).toBeInTheDocument();
  });

  it("renders children by default (open)", () => {
    render(<TreeView nodes={nodes} />);
    // Root level (depth 0) is open by default, so "components" is visible
    expect(screen.getByText("components")).toBeInTheDocument();
    // Nested folder (depth 1) is closed by default — click to open
    fireEvent.click(screen.getByText("components"));
    expect(screen.getByText("Button.tsx")).toBeInTheDocument();
  });

  it("toggles children on click", () => {
    render(<TreeView nodes={nodes} />);
    const srcNode = screen.getByText("src");
    fireEvent.click(srcNode);
    expect(screen.queryByText("components")).not.toBeInTheDocument();
    fireEvent.click(srcNode);
    expect(screen.getByText("components")).toBeInTheDocument();
  });
});
