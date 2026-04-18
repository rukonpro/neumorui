import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "./QRCode";

const meta: Meta<typeof QRCode> = {
  title: "Components/QRCode",
  component: QRCode,
};

export default meta;
type Story = StoryObj<typeof QRCode>;

export const Default: Story = {
  args: { value: "https://neumorui.vercel.app", label: "neumorui.vercel.app" },
};

export const CustomColor: Story = {
  args: { value: "Hello NeumorUI!", fgColor: "var(--neu-accent)", label: "Custom color" },
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <QRCode value="https://neumorui.vercel.app" size={140} label="Default" />
      <QRCode value="Custom" size={140} fgColor="var(--neu-accent)" label="Accent" />
    </div>
  ),
};
