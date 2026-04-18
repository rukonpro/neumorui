import type { Meta, StoryObj } from "@storybook/react";
import { MusicPlayerCard } from "./MusicPlayerCard";

const meta: Meta<typeof MusicPlayerCard> = {
  title: "Components/MusicPlayerCard",
  component: MusicPlayerCard,
};

export default meta;
type Story = StoryObj<typeof MusicPlayerCard>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MusicPlayerCard
        title="Midnight Dreams"
        artist="NeumorUI"
        album="Clay Sessions"
        coverArt="https://picsum.photos/seed/music1/300/300"
        progress={42}
        currentTime="1:32"
        duration="3:45"
      />
    </div>
  ),
};

export const NoCover: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MusicPlayerCard
        title="Lo-fi Beats"
        artist="Chill FM"
        progress={68}
        currentTime="2:30"
        duration="3:45"
      />
    </div>
  ),
};
