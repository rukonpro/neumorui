import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanels } from "./ResizablePanels";

const meta: Meta<typeof ResizablePanels> = {
  title: "Components/ResizablePanels",
  component: ResizablePanels,
};

export default meta;
type Story = StoryObj<typeof ResizablePanels>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanels defaultSize={35} style={{ height: 200 }}>
      <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--neu-text-secondary)" }}>Sidebar</span>
      </div>
      <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--neu-text-secondary)" }}>Content</span>
      </div>
    </ResizablePanels>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanels direction="vertical" defaultSize={40} style={{ height: 300 }}>
      <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--neu-text-secondary)" }}>Top</span>
      </div>
      <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--neu-text-secondary)" }}>Bottom</span>
      </div>
    </ResizablePanels>
  ),
};
