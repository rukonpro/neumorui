import type { Meta, StoryObj } from "@storybook/react";
import { LinkPreview } from "./LinkPreview";

const meta: Meta<typeof LinkPreview> = {
  title: "Components/LinkPreview",
  component: LinkPreview,
};

export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const Default: Story = {
  render: () => (
    <p style={{ fontSize: 14, color: "var(--neu-text-secondary)", lineHeight: 2 }}>
      Check out{" "}
      <LinkPreview
        href="https://github.com"
        title="GitHub: Let's build from here"
        description="GitHub is where over 100 million developers shape the future of software."
        image="https://picsum.photos/seed/gh/400/200"
      >
        GitHub
      </LinkPreview>
      {" "}for open source.
    </p>
  ),
};
