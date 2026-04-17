import type { MetadataRoute } from "next";
import { componentMeta } from "@/data/component-meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages = componentMeta.map((c) => ({
    url: `${SITE_URL}/docs/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...componentPages,
  ];
}
