"use client";

import React from "react";
import { Badge, Button } from "neumorui";
import { componentDocs } from "@/data/components";
import { ComponentPreview } from "@/components/ComponentPreview";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsPlayground } from "@/components/PropsPlayground";

export default function ComponentPageClient({ slug }: { slug: string }) {
  const doc = componentDocs.find((c) => c.slug === slug);

  if (!doc) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>
          Component not found
        </h1>
        <p style={{ fontSize: "14px", color: "var(--neu-text-secondary)", marginBottom: "20px" }}>
          No documentation found for &quot;{slug}&quot;.
        </p>
        <a href="/">
          <Button variant="primary">Back to home</Button>
        </a>
      </div>
    );
  }

  /* Find prev/next */
  const idx = componentDocs.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? componentDocs[idx - 1] : null;
  const next = idx < componentDocs.length - 1 ? componentDocs[idx + 1] : null;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <Badge variant="primary">{doc.category}</Badge>
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "6px" }}>
          {doc.name}
        </h1>
        <p style={{ fontSize: "15px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>
          {doc.description}
        </p>
      </div>

      {/* Import */}
      <div style={{ marginBottom: "24px" }}>
        <CodeBlock code={`import { ${doc.name} } from "neumorui";`} language="tsx" />
      </div>

      {/* Preview + Code */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px" }}>
          Example
        </h2>
        <ComponentPreview preview={doc.preview} code={doc.code} />
      </div>

      {/* Interactive Playground */}
      {doc.props.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <PropsPlayground
            props={doc.props}
            onPropsChange={(values) => {
              // Props playground is visual-only for now — values shown in UI
              console.log("Playground props:", values);
            }}
          />
        </div>
      )}

      {/* Props table */}
      {doc.props.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px" }}>
            Props
          </h2>
          <div
            style={{
              borderRadius: "20px",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {["Prop", "Type", "Default"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          fontSize: "10px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--neu-text-muted)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop, i) => (
                    <tr
                      key={prop.name}
                      style={{
                        borderBottom:
                          i < doc.props.length - 1
                            ? "1px solid rgba(0,0,0,0.04)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 16px",
                          fontSize: "13px",
                          fontWeight: 700,
                          fontFamily: "'SF Mono', 'Fira Code', monospace",
                          color: "var(--neu-accent, #6c7ef8)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {prop.name}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          fontSize: "12px",
                          fontFamily: "'SF Mono', 'Fira Code', monospace",
                          color: "var(--neu-text-secondary)",
                          maxWidth: "320px",
                          wordBreak: "break-word",
                        }}
                      >
                        {prop.type}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          fontSize: "12px",
                          fontFamily: "'SF Mono', 'Fira Code', monospace",
                          color: "var(--neu-text-muted)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {prop.default}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {prev ? (
          <a href={`/docs/${prev.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised-sm)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--neu-text-muted)", marginBottom: "2px" }}>
                Previous
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
                {prev.name}
              </div>
            </div>
          </a>
        ) : (
          <div />
        )}
        {next ? (
          <a href={`/docs/${next.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                textAlign: "right",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--neu-shadow-raised-sm)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--neu-text-muted)", marginBottom: "2px" }}>
                Next
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
                {next.name}
              </div>
            </div>
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
