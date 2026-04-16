import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion
        defaultValue="item-1"
        items={[
          {
            value: "item-1",
            title: "What is NeumorUI?",
            content: "A neumorphic React component library built with Tailwind and Radix UI.",
          },
          {
            value: "item-2",
            title: "Is it accessible?",
            content: "Yes — all components are built on top of Radix primitives with WAI-ARIA support.",
          },
          {
            value: "item-3",
            title: "Can I customize the theme?",
            content: "Absolutely. Override CSS variables or use the NeuProvider accent prop.",
          },
        ]}
      />
    </div>
  ),
};
