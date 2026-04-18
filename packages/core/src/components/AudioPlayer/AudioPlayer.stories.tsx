import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer } from "./AudioPlayer";

const meta: Meta<typeof AudioPlayer> = {
  title: "Components/AudioPlayer",
  component: AudioPlayer,
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Chill Vibes",
    artist: "SoundHelix",
  },
};

export const WithCover: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Night Drive",
    artist: "DJ Relax",
    coverArt: "https://picsum.photos/seed/audio/100/100",
  },
};
