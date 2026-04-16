import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "../Button/Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="primary">Actions</Button>}
      items={[
        { type: "label", label: "Account" },
        { label: "Profile", shortcut: "⌘P" },
        { label: "Settings", shortcut: "⌘S" },
        { type: "separator" },
        { label: "Invite team", shortcut: "⇧⌘I" },
        { label: "Billing" },
        { type: "separator" },
        { label: "Sign out", danger: true },
      ]}
    />
  ),
};
