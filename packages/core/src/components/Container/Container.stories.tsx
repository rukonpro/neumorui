import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["sm", "md", "lg", "xl"] as const).map((sz) => (
        <Container key={sz} size={sz} style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset-sm)", borderRadius: 12, padding: "10px 16px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--neu-text-secondary)" }}>Container size="{sz}"</span>
        </Container>
      ))}
    </div>
  ),
};
