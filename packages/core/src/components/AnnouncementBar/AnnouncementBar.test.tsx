import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AnnouncementBar } from "./AnnouncementBar";

describe("AnnouncementBar", () => {
  it("renders children text", () => {
    render(<AnnouncementBar>Hello world</AnnouncementBar>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("dismisses when close button is clicked", () => {
    const handleDismiss = vi.fn();
    render(
      <AnnouncementBar dismissible onDismiss={handleDismiss}>
        Dismissible
      </AnnouncementBar>
    );
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Dismissible")).not.toBeInTheDocument();
  });

  it("does not show close button when not dismissible", () => {
    render(<AnnouncementBar>Static</AnnouncementBar>);
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });
});
