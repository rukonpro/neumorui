import type { MetadataRoute } from "next";
import { TOTAL_COMPONENTS } from "@/data/component-meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `NeumorUI — Neumorphic React Component Library`,
    short_name: "NeumorUI",
    description: `${TOTAL_COMPONENTS} clay-style neumorphic React components built with TypeScript, Tailwind CSS, and Radix UI.`,
    start_url: "/",
    display: "standalone",
    background_color: "#e0e5ec",
    theme_color: "#e0e5ec",
    orientation: "portrait-primary",
    categories: ["developer tools", "design", "utilities"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
