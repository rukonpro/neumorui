import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./Kbd";

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--neu-text-secondary)" }}>
        <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open search
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--neu-text-secondary)" }}>
        <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <Kbd size="sm">Esc</Kbd>
        <Kbd size="md">Tab</Kbd>
        <Kbd size="lg">Enter</Kbd>
      </div>
    </div>
  ),
};
