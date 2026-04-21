import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PromptCard, PromptGrid } from "./PromptCard";

describe("PromptCard", () => {
  it("renders title and description", () => {
    render(<PromptCard title="Write code" description="Generate React code" prompt="Write code" />);
    expect(screen.getByText("Write code")).toBeInTheDocument();
    expect(screen.getByText("Generate React code")).toBeInTheDocument();
  });

  it("calls onClick with prompt text", () => {
    const onClick = vi.fn();
    render(<PromptCard title="Test" prompt="Hello AI" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledWith("Hello AI");
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(<PromptCard title="Test" prompt="Hello" onClick={onClick} disabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders category badge", () => {
    render(<PromptCard title="Test" prompt="Test" category="Coding" />);
    expect(screen.getByText("Coding")).toBeInTheDocument();
  });
});

describe("PromptGrid", () => {
  it("renders all prompt cards", () => {
    const prompts = [
      { title: "A", prompt: "a" },
      { title: "B", prompt: "b" },
    ];
    render(<PromptGrid prompts={prompts} onSelect={() => {}} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
