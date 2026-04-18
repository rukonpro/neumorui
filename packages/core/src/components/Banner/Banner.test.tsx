import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders content", () => {
    render(<Banner>Maintenance tonight</Banner>);
    expect(screen.getByText("Maintenance tonight")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(<Banner icon="⚠️">Warning</Banner>);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("dismisses on close click", () => {
    const onDismiss = vi.fn();
    render(<Banner onDismiss={onDismiss}>Test</Banner>);
    fireEvent.click(screen.getByLabelText("Dismiss banner"));
    expect(onDismiss).toHaveBeenCalled();
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
