import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AvatarGroup } from "./AvatarGroup";

const avatars = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Charlie Brown" },
  { name: "Diana Prince" },
  { name: "Eve Adams" },
  { name: "Frank Castle" },
];

describe("AvatarGroup", () => {
  it("renders visible avatars up to max", () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByTitle("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByTitle("Bob Smith")).toBeInTheDocument();
    expect(screen.getByTitle("Charlie Brown")).toBeInTheDocument();
  });

  it("shows +N for overflow avatars", () => {
    render(<AvatarGroup avatars={avatars} max={3} />);
    expect(screen.getByText("+3")).toBeInTheDocument();
  });

  it("renders initials when no src is provided", () => {
    render(<AvatarGroup avatars={[{ name: "Alice Johnson" }]} max={2} />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("does not show overflow indicator when avatars fit within max", () => {
    render(<AvatarGroup avatars={avatars.slice(0, 2)} max={4} />);
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });
});
