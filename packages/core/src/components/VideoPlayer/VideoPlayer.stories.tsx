import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        poster="https://picsum.photos/seed/vid/480/270"
      />
    </div>
  ),
};
