import type { Meta, StoryObj } from "@storybook/react";
import { Marquee, MarqueeItem } from "./Marquee";

const meta: Meta<typeof Marquee> = {
  title: "Components/Marquee",
  component: Marquee,
};
export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  render: () => (
    <Marquee>
      <MarqueeItem>React</MarqueeItem>
      <MarqueeItem>TypeScript</MarqueeItem>
      <MarqueeItem>Neumorphic</MarqueeItem>
      <MarqueeItem>Clay UI</MarqueeItem>
      <MarqueeItem>Design</MarqueeItem>
    </Marquee>
  ),
};

export const ReverseDirection: Story = {
  render: () => (
    <Marquee direction="right" speed={10}>
      <MarqueeItem>Fast</MarqueeItem>
      <MarqueeItem>Reverse</MarqueeItem>
      <MarqueeItem>Marquee</MarqueeItem>
    </Marquee>
  ),
};

export const PauseOnHover: Story = {
  render: () => (
    <Marquee pauseOnHover>
      <MarqueeItem>Hover to pause</MarqueeItem>
      <MarqueeItem>Smooth scroll</MarqueeItem>
      <MarqueeItem>NeumorUI</MarqueeItem>
    </Marquee>
  ),
};
