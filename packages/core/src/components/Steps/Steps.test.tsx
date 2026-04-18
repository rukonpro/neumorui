import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Steps } from "./Steps";

const steps = [
  { title: "Account" },
  { title: "Profile" },
  { title: "Review" },
];

describe("Steps", () => {
  it("renders all step titles", () => {
    render(<Steps steps={steps} current={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<Steps steps={[{ title: "Step 1", description: "Do this" }]} current={0} />);
    expect(screen.getByText("Do this")).toBeInTheDocument();
  });

  it("shows checkmark for completed steps", () => {
    const { container } = render(<Steps steps={steps} current={2} />);
    const checkmarks = container.querySelectorAll("svg polyline");
    expect(checkmarks.length).toBe(2);
  });
});
