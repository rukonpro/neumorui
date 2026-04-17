import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  const items = [
    { label: "Dashboard", active: true, group: "Main" },
    { label: "Settings", badge: 5, group: "Other" },
  ];

  it("renders all items", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders group labels", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("renders badge", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
