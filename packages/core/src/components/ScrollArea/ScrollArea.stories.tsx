import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <ScrollArea maxHeight={200}>
        <div style={{ padding: 16 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{ padding: "8px 12px", marginBottom: 6, borderRadius: 10, background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 600 }}>
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
