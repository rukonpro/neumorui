import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Command } from "./Command";
import { Button } from "../Button/Button";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Palette: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <Button onClick={() => setOpen(true)}>Open palette</Button>
        <span style={{ fontSize: 12, color: "var(--neu-text-muted)" }}>
          or press ⌘K / Ctrl+K
        </span>
        <Command
          open={open}
          onOpenChange={setOpen}
          items={[
            { value: "new-file", label: "New File", shortcut: "⌘N", group: "File", onSelect: () => alert("New file") },
            { value: "open-file", label: "Open File", shortcut: "⌘O", group: "File" },
            { value: "save", label: "Save", shortcut: "⌘S", group: "File" },
            { value: "profile", label: "Profile", group: "Account" },
            { value: "settings", label: "Settings", shortcut: "⌘,", group: "Account" },
            { value: "logout", label: "Sign out", group: "Account" },
            { value: "docs", label: "Docs", keywords: ["help", "documentation"], group: "Help" },
          ]}
        />
      </div>
    );
  },
};
