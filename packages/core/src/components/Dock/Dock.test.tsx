import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Dock } from "./Dock";

const items = [
  { icon: "🏠", label: "Home" },
  { icon: "📁", label: "Files" },
  { icon: "⚙️", label: "Settings" },
];

describe("Dock", () => {
  it("renders all dock items", () => {
    render(<Dock items={items} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("shows tooltip on hover", () => {
    render(<Dock items={items} />);
    fireEvent.mouseEnter(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders badge count", () => {
    render(<Dock items={[{ icon: "💬", label: "Chat", badge: 5 }]} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
