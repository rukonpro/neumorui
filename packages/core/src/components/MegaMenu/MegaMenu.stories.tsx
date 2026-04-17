import type { Meta, StoryObj } from "@storybook/react";
import { MegaMenu } from "./MegaMenu";

const meta: Meta<typeof MegaMenu> = {
  title: "Components/MegaMenu",
  component: MegaMenu,
};
export default meta;
type Story = StoryObj<typeof MegaMenu>;

export const Default: Story = {
  args: {
    items: [
      {
        label: "Products",
        panel: (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Analytics</div>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Dashboards</div>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Reports</div>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Integrations</div>
          </div>
        ),
      },
      {
        label: "Resources",
        panel: (
          <div style={{ fontSize: "13px" }}>
            <p style={{ fontWeight: 700 }}>Documentation</p>
            <p>Guides and tutorials to get started.</p>
          </div>
        ),
      },
    ],
  },
};
