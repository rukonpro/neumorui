import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component: "Neumorphic navigation bar with brand, links, and actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    brand: "NeumorUI",
    links: [
      { label: "Home", href: "#", active: true },
      { label: "Components", href: "#" },
      { label: "Docs", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    brand: "NeumorUI",
    links: [
      { label: "Home", href: "#", active: true },
      { label: "About", href: "#" },
    ],
    actions: (
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    ),
  },
};
