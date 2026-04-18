import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Onboarding } from "./Onboarding";

describe("Onboarding", () => {
  it("renders nothing when inactive", () => {
    const { container } = render(
      <Onboarding
        active={false}
        steps={[{ target: "#test", title: "Step 1", description: "Desc" }]}
      />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders step title when active", () => {
    render(
      <div>
        <div id="test" style={{ width: 100, height: 100 }}>Target</div>
        <Onboarding
          active={true}
          steps={[{ target: "#test", title: "Welcome!", description: "First step" }]}
        />
      </div>
    );
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByText("First step")).toBeInTheDocument();
  });

  it("renders skip and next buttons", () => {
    render(
      <div>
        <div id="test">Target</div>
        <Onboarding
          active={true}
          steps={[{ target: "#test", title: "Step", description: "Desc" }]}
        />
      </div>
    );
    expect(screen.getByText("Skip")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
