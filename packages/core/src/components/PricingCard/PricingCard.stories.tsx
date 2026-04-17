import type { Meta, StoryObj } from "@storybook/react";
import { PricingCard } from "./PricingCard";

const meta: Meta<typeof PricingCard> = {
  title: "Components/PricingCard",
  component: PricingCard,
};
export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Default: Story = {
  args: {
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "/mo",
        features: [
          { label: "10 components", included: true },
          { label: "Light mode", included: true },
          { label: "Dark mode", included: false },
          { label: "Storybook", included: false },
        ],
        cta: { label: "Start free", variant: "clay" },
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
          { label: "Storybook", included: true },
          { label: "Custom themes", included: true },
        ],
        cta: { label: "Get Pro", variant: "primary" },
      },
      {
        name: "Team",
        price: "$49",
        period: "/mo",
        features: [
          { label: "Everything in Pro", included: true },
          { label: "Unlimited seats", included: true },
          { label: "Priority support", included: true },
          { label: "Private Slack", included: true },
        ],
        cta: { label: "Contact us", variant: "clay" },
      },
    ],
  },
};
