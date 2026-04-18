import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InfiniteScroll } from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  it("renders children", () => {
    render(
      <InfiniteScroll onLoadMore={() => {}} hasMore={true}>
        <div>Item 1</div>
      </InfiniteScroll>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("shows end message when no more items", () => {
    render(
      <InfiniteScroll onLoadMore={() => {}} hasMore={false}>
        <div>Done</div>
      </InfiniteScroll>
    );
    expect(screen.getByText("No more items to load")).toBeInTheDocument();
  });

  it("shows custom end message", () => {
    render(
      <InfiniteScroll onLoadMore={() => {}} hasMore={false} endMessage={<p>All loaded!</p>}>
        <div>Items</div>
      </InfiniteScroll>
    );
    expect(screen.getByText("All loaded!")).toBeInTheDocument();
  });
});
