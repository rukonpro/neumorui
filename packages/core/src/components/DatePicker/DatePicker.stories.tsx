import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div style={{ width: 320 }}>
        <DatePicker label="Start date" value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithConstraints: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 30);
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Appointment (next 30 days)"
          value={date}
          onChange={setDate}
          minDate={today}
          maxDate={max}
        />
      </div>
    );
  },
};
