import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders when open", () => {
    render(
      <Drawer open={true} onOpenChange={() => {}}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Drawer open={false} onOpenChange={() => {}}>
        <p>Content</p>
      </Drawer>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when overlay clicked", () => {
    const handleChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={handleChange}>
        <p>Content</p>
      </Drawer>
    );
    fireEvent.click(screen.getByTestId("drawer-overlay"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
