import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([60]);
    return (
      <div style={{ width: 340 }}>
        <Slider value={value} onValueChange={setValue} label="Volume" />
      </div>
    );
  },
};
