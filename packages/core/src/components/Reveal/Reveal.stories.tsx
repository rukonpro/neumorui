import type { Meta, StoryObj } from "@storybook/react";
import { Reveal } from "./Reveal";
import { Card } from "../Card/Card";

const meta: Meta<typeof Reveal> = {
  title: "Components/Reveal",
  component: Reveal,
};

export default meta;
type Story = StoryObj<typeof Reveal>;

export const OnScroll: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
      <p style={{ color: "var(--neu-text-secondary)" }}>Scroll down to reveal cards.</p>
      <div style={{ height: 400 }} />
      {[0, 100, 200, 300, 400].map((delay) => (
        <Reveal key={delay} delay={delay}>
          <Card>Revealed with {delay}ms delay</Card>
        </Reveal>
      ))}
    </div>
  ),
};
