import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button variant="primary">Open popover</Button>}>
      <h4 style={{ fontWeight: 600, marginBottom: 6 }}>Quick note</h4>
      <p style={{ fontSize: 13, color: "var(--neu-text-secondary)" }}>
        Popovers can host rich content — forms, menus, even mini dashboards.
      </p>
    </Popover>
  ),
};
