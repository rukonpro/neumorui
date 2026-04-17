import type { Metadata } from "next";
import React from "react";
import Script from "next/script";
import LayoutInner from "@/components/LayoutInner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-W7NRRR6KM4";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NeumorUI — Neumorphic React Component Library",
    template: "%s | NeumorUI",
  },
  description:
    "61 clay-style neumorphic React components built with TypeScript, Tailwind CSS, and Radix UI. Open source, accessible, dark mode ready. Copy-paste into your project.",
  keywords: [
    "neumorphic",
    "neumorphism",
    "react components",
    "ui library",
    "tailwind css",
    "radix ui",
    "typescript",
    "clay ui",
    "soft ui",
    "component library",
    "react ui kit",
    "dark mode",
    "neumorui",
    "design system",
  ],
  authors: [{ name: "rukon", url: "https://github.com/rukonpro" }],
  creator: "rukon",
  publisher: "NeumorUI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NeumorUI",
    title: "NeumorUI — Neumorphic React Component Library",
    description:
      "61 clay-style neumorphic React components. TypeScript, Tailwind CSS, Radix UI. Open source, accessible, dark mode ready.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeumorUI — 61 Neumorphic React Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeumorUI — Neumorphic React Component Library",
    description:
      "61 clay-style neumorphic React components. TypeScript, Tailwind CSS, Radix UI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: "NeumorUI",
              description:
                "61 clay-style neumorphic React components built with TypeScript, Tailwind CSS, and Radix UI.",
              programmingLanguage: ["TypeScript", "React", "CSS"],
              runtimePlatform: "Node.js",
              codeRepository: "https://github.com/rukonpro/neumorui",
              license: "https://opensource.org/licenses/MIT",
              author: {
                "@type": "Person",
                name: "rukon",
                url: "https://github.com/rukonpro",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NeumorUI",
              url: SITE_URL,
              description:
                "Documentation for NeumorUI — 61 neumorphic React components.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/docs/{search_term}`,
                },
                "query-input": "required name=search_term",
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <LayoutInner>{children}</LayoutInner>
      </body>
    </html>
  );
}
