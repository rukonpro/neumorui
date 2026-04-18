"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { componentMeta } from "@/data/component-meta";

const transition = "all 0.15s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const SearchDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query) return componentMeta.slice(0, 12);
    const lower = query.toLowerCase();
    return componentMeta.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.category.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower)
    );
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      router.push(`/docs/${results[activeIdx].slug}`);
      setOpen(false);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "min(18vh, 120px)",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        role="presentation"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
          animation: "neuSearchFadeIn 0.15s ease",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "540px",
          margin: "0 16px",
          borderRadius: "22px",
          overflow: "hidden",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "neuSearchScaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neu-text-muted)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search components..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "inherit",
              color: "var(--neu-text-primary)",
            }}
          />
          <kbd
            style={{
              padding: "3px 8px",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 800,
              fontFamily: "inherit",
              color: "var(--neu-text-muted)",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: "360px", overflowY: "auto", padding: "6px", scrollbarWidth: "none" }}>
          {results.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
              No components found for &quot;{query}&quot;
            </div>
          )}

          {results.map((comp, i) => {
            const isActive = i === activeIdx;
            return (
              <a
                key={comp.slug}
                href={`/docs/${comp.slug}`}
                data-idx={i}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  cursor: "pointer",
                  background: isActive ? "rgba(108,126,248,0.06)" : "transparent",
                  boxShadow: isActive ? "var(--neu-shadow-inset-sm)" : "none",
                  transition,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
                    {comp.name}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--neu-text-muted)",
                    marginTop: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "380px",
                  }}>
                    {comp.description}
                  </div>
                </div>
                <span style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: "rgba(108,126,248,0.1)",
                  color: "var(--neu-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>
                  {comp.category}
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 18px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: "16px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>↑↓ Navigate</span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>↵ Open</span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>ESC Close</span>
        </div>
      </div>

      <style>{`
        @keyframes neuSearchFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuSearchScaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};
