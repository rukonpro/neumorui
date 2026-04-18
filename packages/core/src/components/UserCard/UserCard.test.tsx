import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserCard } from "./UserCard";

describe("UserCard", () => {
  it("renders name and role", () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    render(<UserCard name="Jane Cooper" role="Designer" />);
    expect(screen.getByText("Jane Cooper")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();
  });

  it("renders bio", () => {
    render(<UserCard name="Jane" bio="Building great UIs" />);
    expect(screen.getByText("Building great UIs")).toBeInTheDocument();
  });

  it("renders initials when no avatar", () => {
    render(<UserCard name="Jane Cooper" />);
    expect(screen.getByText("JA")).toBeInTheDocument();
  });
});
