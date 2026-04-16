import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised)",
          borderRadius: "var(--neu-radius-lg)",
          padding: 4,
        }}
      >
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
    return (
      <div
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised)",
          borderRadius: "var(--neu-radius-lg)",
          padding: 4,
        }}
      >
        <Calendar mode="range" selected={range} onSelect={(r) => setRange(r ?? {})} />
      </div>
    );
  },
};
