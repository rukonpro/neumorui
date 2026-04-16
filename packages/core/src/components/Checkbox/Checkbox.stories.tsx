import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return <Checkbox checked={checked} onCheckedChange={setChecked} label="Accept terms" />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Checkbox checked disabled label="Disabled checked" />
      <Checkbox disabled label="Disabled unchecked" />
    </div>
  ),
};
