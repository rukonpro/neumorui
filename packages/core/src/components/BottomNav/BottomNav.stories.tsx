import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomNav } from "./BottomNav";

const meta: Meta<typeof BottomNav> = {
  title: "Components/BottomNav",
  component: BottomNav,
  parameters: {
    docs: {
      description: {
        component: "Mobile bottom navigation bar with neumorphic styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div style={{ maxWidth: "400px" }}>
        <BottomNav
          activeIndex={active}
          onActiveChange={setActive}
          items={[
            { label: "Home", icon: "🏠" },
            { label: "Search", icon: "🔍" },
            { label: "Create", icon: "+", isCreate: true },
            { label: "Chat", icon: "💬", badge: 3 },
            { label: "Profile", icon: "👤" },
          ]}
        />
      </div>
    );
  },
};

export const Simple: Story = {
  args: {
    activeIndex: 0,
    items: [
      { label: "Home", icon: "🏠" },
      { label: "Explore", icon: "🔍" },
      { label: "Settings", icon: "⚙️" },
    ],
  },
};
