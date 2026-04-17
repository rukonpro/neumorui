"use client";

import React, { useState } from "react";
import { NeuProvider, useNeuTheme } from "neumorui";
import "neumorui/styles";
import "./globals.css";
import { DocsSidebar } from "@/components/Sidebar";

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useNeuTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <DocsSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            background: "var(--neu-bg)",
            position: "sticky",
            top: 0,
            zIndex: 30,
            transition: "background 0.35s ease",
          }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="docs-mobile-hamburger"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              color: "var(--neu-text-primary)",
            }}
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/favicon.svg" alt="NeumorUI" style={{ width: "28px", height: "28px" }} />
            <span style={{ fontSize: "14px", fontWeight: 900, color: "var(--neu-text-primary)", letterSpacing: "-0.02em" }}>
              NeumorUI
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                color: "var(--neu-text-primary)",
                transition: "all 0.2s ease",
                fontSize: "16px",
              }}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10A6 6 0 016 2a6 6 0 108 8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* Storybook link */}
            <a
              href="https://rukonpro.github.io/neumorui"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                color: "var(--neu-text-primary)",
                transition: "all 0.2s ease",
                fontSize: "16px",
              }}
              aria-label="Storybook"
            >
              📖
            </a>

            {/* npm link */}
            <a
              href="https://www.npmjs.com/package/neumorui"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                color: "var(--neu-text-primary)",
                transition: "all 0.2s ease",
                fontSize: "16px",
              }}
              aria-label="npm"
            >
              📦
            </a>

            {/* GitHub link */}
            <a
              href="https://github.com/rukonpro/neumorui"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
                color: "var(--neu-text-primary)",
                transition: "all 0.2s ease",
              }}
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </header>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "24px 20px 48px",
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .docs-mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NeumorUI - Documentation</title>
        <meta name="description" content="Documentation for NeumorUI - 61 clay-style React components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <NeuProvider defaultTheme="light" defaultAccent="violet">
          <LayoutInner>{children}</LayoutInner>
        </NeuProvider>
      </body>
    </html>
  );
}
