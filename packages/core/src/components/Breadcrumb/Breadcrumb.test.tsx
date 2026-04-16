import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders all item labels", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Page" },
        ]}
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
  });

  it("renders as a nav with Breadcrumb label", () => {
    render(<Breadcrumb items={[{ label: "A" }]} />);
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });

  it("calls onClick when middle item is clicked", () => {
    const handler = vi.fn();
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/", onClick: handler },
          { label: "Last" },
        ]}
      />
    );
    fireEvent.click(screen.getByText("Home"));
    expect(handler).toHaveBeenCalled();
  });
});
