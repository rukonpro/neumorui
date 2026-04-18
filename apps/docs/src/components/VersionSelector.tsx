"use client";

import React, { useState, useRef, useEffect } from "react";
import { versions, getCurrentVersion } from "@/data/versions";

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const VersionSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = getCurrentVersion();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 800,
          fontFamily: "inherit",
          color: "var(--neu-accent)",
          background: "var(--neu-bg)",
          boxShadow: open ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
          transition,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span>v{current}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "12px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            padding: "4px",
            animation: "neuVerDropIn 0.15s ease",
          }}
        >
          {versions.map((v) => {
            const isActive = v.version === current;
            return (
              <a
                key={v.version}
                href={v.url}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  color: isActive ? "var(--neu-accent)" : "var(--neu-text-secondary)",
                  background: isActive ? "rgba(108,126,248,0.08)" : "transparent",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition,
                }}
              >
                <span>{v.label}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {v.latest && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "1px 6px",
                        borderRadius: "4px",
                        background: "rgba(91,191,138,0.15)",
                        color: "var(--neu-success)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Latest
                    </span>
                  )}
                  {isActive && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--neu-accent)" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes neuVerDropIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
