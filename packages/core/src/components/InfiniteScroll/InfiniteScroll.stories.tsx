import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll } from "./InfiniteScroll";

const meta: Meta<typeof InfiniteScroll> = {
  title: "Components/InfiniteScroll",
  component: InfiniteScroll,
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));
    const [loading, setLoading] = useState(false);
    const hasMore = items.length < 30;
    const loadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setItems((prev) => [...prev, ...Array.from({ length: 5 }, (_, i) => `Item ${prev.length + i + 1}`)]);
        setLoading(false);
      }, 800);
    };
    return (
      <div style={{ maxHeight: 300, overflowY: "auto", borderRadius: 14, boxShadow: "var(--neu-shadow-inset)", padding: 8 }}>
        <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: "8px 12px", marginBottom: 6, borderRadius: 10, background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 600 }}>
              {item}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  },
};
