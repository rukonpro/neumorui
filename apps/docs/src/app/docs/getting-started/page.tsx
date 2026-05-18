import type { Metadata } from "next";
import { GuideCodeBlock } from "@/components/GuideCodeBlock";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export const metadata: Metadata = {
  title: "Getting Started — NeumorUI",
  description: "Install NeumorUI in 1 minute. Add your first neumorphic React component to a Next.js, Vite, or Remix app.",
  alternates: { canonical: `${SITE_URL}/docs/getting-started` },
  openGraph: {
    title: "Getting Started — NeumorUI",
    description: "Install + first component in 60 seconds.",
    url: `${SITE_URL}/docs/getting-started`,
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

export default function GettingStartedPage() {
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
          Getting Started
        </h1>
        <p style={{ ...paragraph, fontSize: "15px", margin: 0 }}>
          Install NeumorUI and render your first neumorphic component in under a minute.
        </p>
      </header>

      <h2 style={sectionTitle}>1. Install</h2>
      <p style={paragraph}>
        Use your package manager of choice:
      </p>
      <GuideCodeBlock
        language="bash"
        code={`# pnpm
pnpm add neumorui

# npm
npm install neumorui

# yarn
yarn add neumorui`}
      />

      <h2 style={sectionTitle}>2. Import the stylesheet</h2>
      <p style={paragraph}>
        Import once at your app root so CSS variables and animations are available everywhere.
      </p>

      <h3 style={{ ...sectionTitle, fontSize: "15px", marginTop: "20px" }}>Next.js (App Router)</h3>
      <p style={paragraph}>
        Add the import to <code style={inlineCode}>app/layout.tsx</code>:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`import "neumorui/styles";
import { NeuProvider } from "neumorui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NeuProvider>{children}</NeuProvider>
      </body>
    </html>
  );
}`}
      />

      <h3 style={{ ...sectionTitle, fontSize: "15px", marginTop: "20px" }}>Vite / CRA / Remix</h3>
      <p style={paragraph}>
        Add the import to your entry file (e.g. <code style={inlineCode}>main.tsx</code>):
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`import "neumorui/styles";
import { NeuProvider } from "neumorui";
import App from "./App";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NeuProvider>
    <App />
  </NeuProvider>
);`}
      />

      <h2 style={sectionTitle}>3. Use a component</h2>
      <p style={paragraph}>
        Import the components you need. Tree-shaking ensures only what you use ends up in the bundle.
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`import { Button, Card, Input } from "neumorui";

export default function Demo() {
  return (
    <Card>
      <h2>Sign in</h2>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Continue</Button>
    </Card>
  );
}`}
      />

      <h2 style={sectionTitle}>That&apos;s it</h2>
      <p style={paragraph}>
        You&apos;re ready to build. Browse the sidebar for the full component reference, or jump into:
      </p>
      <ul style={{ ...paragraph, paddingLeft: "20px" }}>
        <li>
          <a href="/docs/theming" style={{ color: "var(--neu-accent)", fontWeight: 700 }}>
            Theming
          </a>{" "}
          — customize colors, radius, font without forking.
        </li>
        <li>
          <a href="/docs/ssr" style={{ color: "var(--neu-accent)", fontWeight: 700 }}>
            SSR + Next.js
          </a>{" "}
          — hydration-safe usage, server components.
        </li>
      </ul>

      <h2 style={sectionTitle}>Requirements</h2>
      <ul style={{ ...paragraph, paddingLeft: "20px" }}>
        <li>React 18 or 19</li>
        <li>TypeScript 5+ (optional but recommended)</li>
        <li>A bundler that supports ESM (Vite, Next.js, Remix, etc.)</li>
        <li>Tailwind CSS is <strong>not required</strong> — NeumorUI ships its own CSS.</li>
      </ul>
    </article>
  );
}
