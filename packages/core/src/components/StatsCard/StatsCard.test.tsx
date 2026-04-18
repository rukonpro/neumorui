import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsCard } from "./StatsCard";

describe("StatsCard", () => {
  it("renders label and value", () => {
    render(<StatsCard label="Revenue" value="$12,450" animate={false} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,450")).toBeInTheDocument();
  });

  it("renders trend with up arrow", () => {
    render(
      <StatsCard
        label="Users"
        value="100"
        trend={{ value: "10%", direction: "up" }}
      />
    );
    expect(screen.getByText(/↑/)).toBeInTheDocument();
    expect(screen.getByText(/10%/)).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <StatsCard label="Users" value="100" description="vs last month" />
    );
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });
});
