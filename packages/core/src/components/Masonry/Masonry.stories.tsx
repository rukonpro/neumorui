import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./Masonry";

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
};

export default meta;
type Story = StoryObj<typeof Masonry>;

export const Default: Story = {
  render: () => (
    <Masonry columns={3} gap={10}>
      {[80, 120, 100, 140, 90, 110, 130, 95, 115].map((h, i) => (
        <div key={i} style={{ height: h, borderRadius: 14, background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--neu-text-muted)" }}>
          {h}px
        </div>
      ))}
    </Masonry>
  ),
};
