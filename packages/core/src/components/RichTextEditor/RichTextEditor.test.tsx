import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  it("renders the editor area", () => {
    render(<RichTextEditor />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders toolbar buttons", () => {
    render(<RichTextEditor />);
    expect(screen.getByTitle("Bold")).toBeInTheDocument();
    expect(screen.getByTitle("Italic")).toBeInTheDocument();
    expect(screen.getByTitle("Underline")).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<RichTextEditor label="Content" />);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<RichTextEditor disabled />);
    const editor = screen.getByRole("textbox");
    expect(editor).toHaveAttribute("contenteditable", "false");
  });
});
