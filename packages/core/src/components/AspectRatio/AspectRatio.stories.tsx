import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Widescreen: Story = {
  render: () => (
    <div style={{ width: 320, borderRadius: 16, overflow: "hidden", boxShadow: "var(--neu-shadow-raised)" }}>
      <AspectRatio ratio={16 / 9}>
        <img src="https://picsum.photos/seed/ar1/640/360" alt="16:9" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: 200, borderRadius: 16, overflow: "hidden", boxShadow: "var(--neu-shadow-raised)" }}>
      <AspectRatio ratio={1}>
        <img src="https://picsum.photos/seed/ar2/200/200" alt="1:1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AspectRatio>
    </div>
  ),
};
