import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialCard } from "./TestimonialCard";

const meta: Meta<typeof TestimonialCard> = {
  title: "Components/TestimonialCard",
  component: TestimonialCard,
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
  args: {
    quote: "NeumorUI made our app look premium without hiring a designer. The neumorphic style is beautiful.",
    author: "Sarah Chen",
    role: "CTO, StartupXYZ",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  render: (args) => (
    <div style={{ width: 340 }}>
      <TestimonialCard {...args} />
    </div>
  ),
};

export const NoRating: Story = {
  args: {
    quote: "Clean, consistent, and easy to integrate.",
    author: "Mike Ross",
    role: "Frontend Lead",
  },
  render: (args) => (
    <div style={{ width: 340 }}>
      <TestimonialCard {...args} />
    </div>
  ),
};
