import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { componentMeta, getComponentMeta, getAllSlugs, TOTAL_COMPONENTS } from "@/data/component-meta";
import ComponentPageClient from "./ComponentPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ── Static params for SSG ── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Dynamic SEO metadata per component ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getComponentMeta(slug);

  if (!meta) {
    return { title: "Component Not Found" };
  }

  const title = `${meta.name} — Neumorphic React ${meta.category} Component`;
  const description = `${meta.description} Part of NeumorUI — ${TOTAL_COMPONENTS} clay-style React components with TypeScript, Tailwind CSS, and Radix UI.`;
  const url = `${SITE_URL}/docs/${meta.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "NeumorUI",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${meta.name} — NeumorUI Component`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.name} | NeumorUI`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getComponentMeta(slug);
  if (!meta) {
    notFound();
  }

  return (
    <>
      {/* Per-component JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: `${meta.name} — NeumorUI Component`,
            description: meta.description,
            url: `${SITE_URL}/docs/${meta.slug}`,
            author: {
              "@type": "Person",
              name: "rukon",
              url: "https://github.com/rukonpro",
            },
            publisher: {
              "@type": "Organization",
              name: "NeumorUI",
              url: SITE_URL,
            },
            about: {
              "@type": "SoftwareSourceCode",
              name: meta.name,
              programmingLanguage: "TypeScript",
              runtimePlatform: "React",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: meta.category,
                  item: `${SITE_URL}/docs`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: meta.name,
                  item: `${SITE_URL}/docs/${meta.slug}`,
                },
              ],
            },
          }),
        }}
      />
      <ComponentPageClient slug={slug} />
    </>
  );
}
