import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the hero section", () => {
    render(<Hero title="Hello World" />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Hero title="Build faster" />);
    expect(screen.getByText("Build faster")).toBeInTheDocument();
  });

  it("renders eyebrow", () => {
    render(<Hero title="Title" eyebrow="New Release" />);
    expect(screen.getByText("New Release")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<Hero title="Title" subtitle="A beautiful library" />);
    expect(screen.getByText("A beautiful library")).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(<Hero title="Title" actions={<button>Get started</button>} />);
    expect(screen.getByText("Get started")).toBeInTheDocument();
  });
});
