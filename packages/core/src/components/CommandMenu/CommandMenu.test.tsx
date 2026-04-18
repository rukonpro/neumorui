import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CommandMenu } from "./CommandMenu";

const items = [
  { id: "home", label: "Go Home", group: "Nav" },
  { id: "settings", label: "Settings", group: "Nav" },
];

describe("CommandMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<CommandMenu items={items} open={false} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders search input when open", () => {
    render(<CommandMenu items={items} open={true} />);
    expect(screen.getByPlaceholderText("Type a command or search...")).toBeInTheDocument();
  });

  it("renders items when open", () => {
    render(<CommandMenu items={items} open={true} />);
    expect(screen.getByText("Go Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
