import type { Metadata } from "next";
import { GuideCodeBlock } from "@/components/GuideCodeBlock";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export const metadata: Metadata = {
  title: "SSR & Next.js — NeumorUI",
  description: "Use NeumorUI safely in server-rendered apps. Next.js App Router setup, hydration, and server component compatibility.",
  alternates: { canonical: `${SITE_URL}/docs/ssr` },
  openGraph: {
    title: "SSR & Next.js — NeumorUI",
    description: "Hydration-safe components, server component support, common pitfalls.",
    url: `${SITE_URL}/docs/ssr`,
    type: "article",
  },
};

const sectionTitle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  color: "var(--neu-text-primary)",
  margin: "32px 0 12px",
  letterSpacing: "-0.01em",
};
const paragraph: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "var(--neu-text-secondary)",
  margin: "0 0 12px",
};
const inlineCode: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
  fontSize: "13px",
  padding: "2px 6px",
  borderRadius: "6px",
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-inset-sm)",
  color: "var(--neu-accent)",
};
const calloutBox: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-inset-sm)",
  borderLeft: "3px solid var(--neu-accent)",
  margin: "12px 0",
};

export default function SsrPage() {
  return (
    <article>
      <header style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 900,
            color: "var(--neu-text-primary)",
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          SSR &amp; Next.js
        </h1>
        <p style={{ ...paragraph, fontSize: "15px", margin: 0 }}>
          NeumorUI is built for server-rendered apps. Hydration-safe IDs, no <code style={inlineCode}>window</code>
          {" "}access at render-time, and zero <code style={inlineCode}>useLayoutEffect</code> warnings (as of v0.5.0).
        </p>
      </header>

      <h2 style={sectionTitle}>Next.js App Router setup</h2>
      <p style={paragraph}>
        Wrap your app once at the root. <code style={inlineCode}>NeuProvider</code> is a Client Component, so you need a wrapper if your <code style={inlineCode}>layout.tsx</code> is a Server Component.
      </p>

      <p style={{ ...paragraph, marginTop: "16px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
        1. Create a Providers wrapper
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`// app/providers.tsx
"use client";

import { NeuProvider } from "neumorui";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NeuProvider followSystemTheme>{children}</NeuProvider>;
}`}
      />

      <p style={{ ...paragraph, marginTop: "16px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
        2. Use it from your root layout
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`// app/layout.tsx
import "neumorui/styles";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`}
      />

      <h2 style={sectionTitle}>Which components need &quot;use client&quot;?</h2>
      <p style={paragraph}>
        Components with state, refs, or event handlers must run on the client. That includes most NeumorUI components:
        Button (ripple), Modal, Drawer, Tooltip, anything interactive. If you use them from a Server Component, wrap them in a Client Component.
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`// app/page.tsx — Server Component, OK to use NeuProvider's static children
import { Card } from "neumorui";

export default function HomePage() {
  return (
    <Card>
      <h1>Welcome</h1>
      <p>Static content renders on the server.</p>
    </Card>
  );
}`}
      />
      <GuideCodeBlock
        language="tsx"
        code={`// app/dashboard/interactive.tsx — Client Component for interactive bits
"use client";

import { Button, useToast } from "neumorui";

export function SaveButton() {
  const { toast } = useToast();
  return <Button onClick={() => toast({ message: "Saved" })}>Save</Button>;
}`}
      />

      <h2 style={sectionTitle}>Hydration safety</h2>
      <p style={paragraph}>
        NeumorUI follows React 18 SSR best practices end-to-end:
      </p>
      <ul style={{ ...paragraph, paddingLeft: "20px" }}>
        <li>Item IDs use <code style={inlineCode}>useId()</code> + a ref counter — stable across server and client (no <code style={inlineCode}>Math.random()</code>)</li>
        <li>All <code style={inlineCode}>window</code>/<code style={inlineCode}>document</code>/<code style={inlineCode}>localStorage</code> access happens inside <code style={inlineCode}>useEffect</code> or event handlers</li>
        <li><code style={inlineCode}>localStorage</code> theme restore runs after mount (initial render matches server)</li>
        <li>No <code style={inlineCode}>useLayoutEffect</code> warnings on the server</li>
        <li>TypeScript <code style={inlineCode}>strict</code> mode passes</li>
      </ul>

      <div style={calloutBox}>
        <p style={{ ...paragraph, margin: 0 }}>
          <strong style={{ color: "var(--neu-text-primary)" }}>Tip:</strong> If you see a hydration warning, it&apos;s likely from your own code (e.g. using <code style={inlineCode}>Date.now()</code> at render). Check the browser console — React tells you which DOM mismatch caused it.
        </p>
      </div>

      <h2 style={sectionTitle}>Avoiding the dark-mode flash</h2>
      <p style={paragraph}>
        If you use <code style={inlineCode}>followSystemTheme</code> or restore from localStorage, the server renders &quot;light&quot; first
        and the browser briefly flashes light before switching to the saved theme. Two ways to fix this:
      </p>

      <p style={{ ...paragraph, marginTop: "12px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
        Option A — Set <code style={inlineCode}>data-theme</code> early via inline script
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`// app/layout.tsx
<html lang="en">
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: \`(function () {
          var saved = localStorage.getItem('neu-theme');
          var dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
          document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        })()\`,
      }}
    />
  </head>
  <body>{children}</body>
</html>`}
      />

      <p style={{ ...paragraph, marginTop: "12px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
        Option B — Pick a default and skip system detection
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider defaultTheme="dark">  {/* always dark, no flash */}
  {children}
</NeuProvider>`}
      />

      <h2 style={sectionTitle}>Vite / Vercel / Remix</h2>
      <p style={paragraph}>
        NeumorUI works the same way on Vite SSR, Remix, Astro islands, etc. Just import <code style={inlineCode}>&quot;neumorui/styles&quot;</code> once and render <code style={inlineCode}>NeuProvider</code> at the root.
        Server components aren&apos;t a concept outside Next/Remix, so you can use any NeumorUI component freely from any file.
      </p>

      <h2 style={sectionTitle}>Common pitfalls</h2>
      <ul style={{ ...paragraph, paddingLeft: "20px" }}>
        <li>
          <strong style={{ color: "var(--neu-text-primary)" }}>Forgot &quot;use client&quot;:</strong>{" "}
          If you see <em>&quot;You&apos;re importing a component that needs useState/useEffect&quot;</em>, add
          {" "}<code style={inlineCode}>&quot;use client&quot;</code> to the top of the file.
        </li>
        <li>
          <strong style={{ color: "var(--neu-text-primary)" }}>Two providers:</strong>{" "}
          Don&apos;t nest <code style={inlineCode}>NeuProvider</code>. Mount it once at the app root.
        </li>
        <li>
          <strong style={{ color: "var(--neu-text-primary)" }}>Missing stylesheet:</strong>{" "}
          If components look unstyled, you forgot to import{" "}
          <code style={inlineCode}>&quot;neumorui/styles&quot;</code>.
        </li>
      </ul>
    </article>
  );
}
