import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock code='const x = 1;' />);
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  it("renders title and language badge", () => {
    render(<CodeBlock code="test" title="App.tsx" language="tsx" />);
    expect(screen.getByText("App.tsx")).toBeInTheDocument();
    expect(screen.getByText("tsx")).toBeInTheDocument();
  });

  it("renders line numbers", () => {
    render(<CodeBlock code={"line1\nline2\nline3"} showLineNumbers />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
