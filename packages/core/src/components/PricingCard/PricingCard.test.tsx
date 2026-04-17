import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PricingCard } from "./PricingCard";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: [
      { label: "10 components", included: true },
      { label: "Dark mode", included: false },
    ],
    cta: { label: "Start free", variant: "clay" as const },
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    highlighted: true,
    badge: "Most popular",
    features: [
      { label: "50+ components", included: true },
      { label: "Dark mode", included: true },
    ],
    cta: { label: "Get Pro", variant: "primary" as const },
  },
];

describe("PricingCard", () => {
  it("renders all plans", () => {
    render(<PricingCard plans={plans} />);
    expect(screen.getByTestId("pricing-plan-0")).toBeInTheDocument();
    expect(screen.getByTestId("pricing-plan-1")).toBeInTheDocument();
  });

  it("renders plan names", () => {
    render(<PricingCard plans={plans} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("renders prices", () => {
    render(<PricingCard plans={plans} />);
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$12")).toBeInTheDocument();
  });

  it("renders badge for highlighted plan", () => {
    render(<PricingCard plans={plans} />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("renders features", () => {
    render(<PricingCard plans={plans} />);
    expect(screen.getAllByText(/10 components/).length).toBeGreaterThan(0);
  });

  it("calls onCtaClick", () => {
    const onClick = vi.fn();
    render(<PricingCard plans={plans} onCtaClick={onClick} />);
    fireEvent.click(screen.getByTestId("pricing-cta-0"));
    expect(onClick).toHaveBeenCalledWith("Free");
  });
});
