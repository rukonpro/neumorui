"use client";

import React from "react";

import { Card, Badge, Button } from "neumorui";
import { componentDocs } from "@/data/components";
import { CodeBlock } from "@/components/CodeBlock";
import { getCurrentVersion } from "@/data/versions";

const categoryColors: Record<string, string> = {
  Form: "#6c7ef8",
  Layout: "#5b9ee0",
  "Data Display": "#4dbfa0",
  Navigation: "#e8a84b",
  Overlay: "#e07090",
  Feedback: "#9c6cf8",
  Disclosure: "#6ca8f8",
  Date: "#4db8a0",
  Command: "#e0a84b",
  Animation: "#f86c8e",
  Showpiece: "#e07060",
  Media: "#5bbf8a",
  Utility: "#e8b84b",
};

// Auto-generate categories from componentDocs
const categories = Object.entries(
  componentDocs.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {})
).map(([name, count]) => ({
  name,
  color: categoryColors[name] || "#6c7ef8",
  count,
}));

function CopyableInstall() {
  const [copied, setCopied] = React.useState(false);
  const cmd = "npm install neumorui";
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(cmd); } catch {
      const ta = document.createElement("textarea"); ta.value = cmd; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px",
        borderRadius: "16px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset)",
        fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
      }}
    >
      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-primary)" }}>
        <span style={{ color: "var(--neu-text-muted)", marginRight: "8px" }}>$</span>
        {cmd}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 12px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "inherit",
          color: copied ? "var(--neu-success)" : "var(--neu-text-muted)",
          background: "var(--neu-bg)",
          boxShadow: copied ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
          transition: "all 0.18s ease",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function HomePage() {
  const version = getCurrentVersion();
  const totalComponents = componentDocs.length;

  return (
    <div>
      {/* Hero section */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 0 32px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--neu-accent, #6c7ef8)",
            marginBottom: "20px",
          }}
        >
          v{version}
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: "12px",
            color: "var(--neu-text-primary)",
          }}
        >
          NeumorUI
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--neu-text-secondary)",
            maxWidth: "520px",
            margin: "0 auto 24px",
            lineHeight: 1.6,
          }}
        >
          {totalComponents} beautiful clay-style React components. Built with TypeScript, styled
          with neumorphic shadows, powered by Radix UI primitives.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/docs/button">
            <Button variant="primary">Get started</Button>
          </a>
          <a href="https://github.com/rukonpro/neumorui" target="_blank" rel="noopener noreferrer">
            <Button variant="raised">GitHub</Button>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Components", value: String(totalComponents) },
          { label: "Categories", value: String(categories.length) },
          { label: "TypeScript", value: "100%" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "14px 24px",
              borderRadius: "16px",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: 900, color: "var(--neu-accent, #6c7ef8)" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Installation */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px" }}>
          Quick Install
        </h2>
        <CopyableInstall />
        <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.7, margin: "16px 0 8px" }}>
          Then wrap your app with the provider:
        </p>
        <CodeBlock code={`import { NeuProvider } from "neumorui";
import "neumorui/styles";

function App() {
  return (
    <NeuProvider defaultTheme="light" defaultAccent="violet">
      <YourApp />
    </NeuProvider>
  );
}`} language="tsx" />
      </div>

      {/* Categories */}
      <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>
        Components by Category
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        {categories.map((cat) => (
          <Card key={cat.name} variant="raised" padding="md" style={{ cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 800 }}>{cat.name}</h3>
              <Badge variant="primary">{cat.count}</Badge>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {componentDocs
                .filter((c) => c.category === cat.name)
                .map((c) => (
                  <a key={c.slug} href={`/docs/${c.slug}`}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--neu-text-secondary)",
                        background: "var(--neu-bg)",
                        boxShadow: "var(--neu-shadow-inset-sm)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {c.name}
                    </span>
                  </a>
                ))}
            </div>
          </Card>
        ))}
      </div>

      {/* All components grid */}
      <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>
        All Components
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {componentDocs.map((comp) => (
          <a key={comp.slug} href={`/docs/${comp.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "14px",
                borderRadius: "16px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                transition: "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised-sm)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontWeight: 800, fontSize: "14px", color: "var(--neu-text-primary)" }}>
                  {comp.name}
                </span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--neu-accent, #6c7ef8)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {comp.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
