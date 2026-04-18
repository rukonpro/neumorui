import type { Meta, StoryObj } from "@storybook/react";
import { BackToTop } from "./BackToTop";

const meta: Meta<typeof BackToTop> = {
  title: "Components/BackToTop",
  component: BackToTop,
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {
  args: {
    threshold: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200px", position: "relative" }}>
        <p>Scroll down to see the button (threshold set to 0 for demo).</p>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, position: "relative", height: "100px" }}>
      <BackToTop threshold={0} size="sm" position="bottom-left" />
      <BackToTop threshold={0} size="md" position="bottom-center" />
      <BackToTop threshold={0} size="lg" position="bottom-right" />
    </div>
  ),
};
