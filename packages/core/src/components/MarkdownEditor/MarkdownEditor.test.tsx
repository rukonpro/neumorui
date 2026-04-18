import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MarkdownEditor } from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  it("renders the textarea in write mode", () => {
    render(<MarkdownEditor />);
    expect(screen.getByPlaceholderText("Write markdown here...")).toBeInTheDocument();
  });

  it("switches to preview tab", () => {
    render(<MarkdownEditor value="# Hello" />);
    fireEvent.click(screen.getByText(/Preview/));
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<MarkdownEditor label="Notes" />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("shows both write and preview tabs", () => {
    render(<MarkdownEditor />);
    expect(screen.getByText(/Write/)).toBeInTheDocument();
    expect(screen.getByText(/Preview/)).toBeInTheDocument();
  });
});
