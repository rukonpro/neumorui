import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "./ImageGallery";

const meta: Meta<typeof ImageGallery> = {
  title: "Components/ImageGallery",
  component: ImageGallery,
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const sampleImages = [
  { src: "https://picsum.photos/seed/a/400/400", alt: "Image 1", caption: "First image" },
  { src: "https://picsum.photos/seed/b/400/400", alt: "Image 2", caption: "Second image" },
  { src: "https://picsum.photos/seed/c/400/400", alt: "Image 3" },
  { src: "https://picsum.photos/seed/d/400/400", alt: "Image 4" },
  { src: "https://picsum.photos/seed/e/400/400", alt: "Image 5" },
  { src: "https://picsum.photos/seed/f/400/400", alt: "Image 6" },
];

export const Default: Story = {
  args: {
    images: sampleImages,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    columns: 2,
    gap: 16,
    rounded: 20,
  },
};

export const NoLightbox: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    columns: 3,
    lightbox: false,
  },
};
