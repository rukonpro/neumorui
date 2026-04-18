import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  it("renders with default label", () => {
    render(<CopyButton text="hello" />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<CopyButton text="hello" label="Copy code" />);
    expect(screen.getByText("Copy code")).toBeInTheDocument();
  });

  it("renders icon variant without label text", () => {
    render(<CopyButton text="hello" variant="icon" />);
    expect(screen.queryByText("Copy")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
