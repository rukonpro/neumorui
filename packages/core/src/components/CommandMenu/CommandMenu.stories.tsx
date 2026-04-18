import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommandMenu } from "./CommandMenu";

const meta: Meta<typeof CommandMenu> = {
  title: "Components/CommandMenu",
  component: CommandMenu,
};

export default meta;
type Story = StoryObj<typeof CommandMenu>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
          Open Command Menu (⌘K)
        </button>
        <CommandMenu
          open={open}
          onOpenChange={setOpen}
          items={[
            { id: "home", label: "Go to Home", icon: "🏠", group: "Navigation", shortcut: "⌘H" },
            { id: "docs", label: "Go to Docs", icon: "📖", group: "Navigation" },
            { id: "theme", label: "Toggle Theme", icon: "🌙", group: "Actions", shortcut: "⌘T" },
            { id: "github", label: "Open GitHub", icon: "🐙", group: "Links" },
          ]}
        />
      </div>
    );
  },
};
