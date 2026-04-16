import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Combobox } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <div style={{ width: 300 }}>
        <Combobox
          label="Framework"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "next", label: "Next.js", description: "React meta-framework" },
            { value: "remix", label: "Remix", description: "Full-stack web framework" },
            { value: "astro", label: "Astro", description: "Islands architecture" },
            { value: "sveltekit", label: "SvelteKit", description: "Svelte app framework" },
            { value: "nuxt", label: "Nuxt", description: "Vue framework" },
            { value: "solid-start", label: "SolidStart", description: "Solid.js meta-framework" },
          ]}
        />
      </div>
    );
  },
};
