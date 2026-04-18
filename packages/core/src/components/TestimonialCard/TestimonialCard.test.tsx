import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TestimonialCard } from "./TestimonialCard";

describe("TestimonialCard", () => {
  it("renders quote and author", () => {
    render(<TestimonialCard quote="Great library!" author="Sarah" />);
    expect(screen.getByText("Great library!")).toBeInTheDocument();
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });

  it("renders role", () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    render(<TestimonialCard quote="Nice" author="Jane" role="CTO" />);
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("renders star rating", () => {
    const { container } = render(<TestimonialCard quote="Test" author="A" rating={4} />);
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBe(5);
  });
});
