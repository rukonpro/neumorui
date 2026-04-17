import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActivityFeed } from "./ActivityFeed";

const items = [
  { user: "Rafat", action: "pushed to main", time: "2 min ago", color: "var(--neu-accent)" },
  { user: "Amina", action: "merged PR #42", time: "15 min ago", color: "var(--neu-success)" },
];

describe("ActivityFeed", () => {
  it("renders feed items", () => {
    render(<ActivityFeed items={items} />);
    expect(screen.getByText("Rafat")).toBeInTheDocument();
    expect(screen.getByText("Amina")).toBeInTheDocument();
  });

  it("renders time", () => {
    render(<ActivityFeed items={items} />);
    expect(screen.getByText("2 min ago")).toBeInTheDocument();
  });

  it("renders load more button when onLoadMore provided", () => {
    const onLoadMore = vi.fn();
    render(<ActivityFeed items={items} onLoadMore={onLoadMore} />);
    const btn = screen.getByTestId("load-more-btn");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not render load more button when onLoadMore not provided", () => {
    render(<ActivityFeed items={items} />);
    expect(screen.queryByTestId("load-more-btn")).not.toBeInTheDocument();
  });
});
