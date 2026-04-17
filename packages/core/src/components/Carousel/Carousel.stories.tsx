import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  {
    content: <div style={{ color: "#fff", fontWeight: 800, fontSize: "20px" }}>Slide One</div>,
    background: "linear-gradient(135deg, #8490fa, #5a6cf5)",
  },
  {
    content: <div style={{ color: "#fff", fontWeight: 800, fontSize: "20px" }}>Slide Two</div>,
    background: "linear-gradient(135deg, #f79548, #f06292)",
  },
  {
    content: <div style={{ color: "#fff", fontWeight: 800, fontSize: "20px" }}>Slide Three</div>,
    background: "linear-gradient(135deg, #5ecba1, #3db88a)",
  },
];

export const Default: Story = {
  args: { slides },
};

export const AutoPlay: Story = {
  args: { slides, autoPlay: true, interval: 3000 },
};
