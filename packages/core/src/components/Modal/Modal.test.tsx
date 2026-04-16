import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders children when open", () => {
    render(
      <Modal open title="Title" description="Desc">
        <p>Body text</p>
      </Modal>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(
      <Modal open={false} title="Hidden">
        <p>nope</p>
      </Modal>
    );
    expect(screen.queryByText("Hidden")).toBeNull();
    expect(screen.queryByText("nope")).toBeNull();
  });

  it("renders trigger when closed", () => {
    render(
      <Modal trigger={<button>Open</button>}>
        <p>body</p>
      </Modal>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});
