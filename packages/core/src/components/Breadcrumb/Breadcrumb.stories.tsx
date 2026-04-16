import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Components", href: "#" },
      { label: "Breadcrumb" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: <span style={{ color: "var(--neu-accent)" }}>›</span>,
    items: [
      { label: "Dashboard", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Billing", href: "#" },
      { label: "Invoices" },
    ],
  },
};
