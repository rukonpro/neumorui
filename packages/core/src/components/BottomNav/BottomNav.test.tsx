import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BottomNav } from "./BottomNav";

describe("BottomNav", () => {
  const items = [
    { label: "Home", icon: "🏠" },
    { label: "Search", icon: "🔍" },
    { label: "Profile", icon: "👤" },
  ];

  it("renders all items", () => {
    render(<BottomNav items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("calls onActiveChange when item clicked", () => {
    const handleChange = vi.fn();
    render(<BottomNav items={items} onActiveChange={handleChange} />);
    fireEvent.click(screen.getByText("Search"));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("renders badge when provided", () => {
    const withBadge = [{ label: "Chat", icon: "💬", badge: 5 }];
    render(<BottomNav items={withBadge} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
