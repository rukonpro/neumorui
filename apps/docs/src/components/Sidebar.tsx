"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarCategory {
  name: string;
  items: { slug: string; name: string }[];
}

const categories: SidebarCategory[] = [
  {
    name: "Form",
    items: [
      { slug: "button", name: "Button" },
      { slug: "input", name: "Input" },
      { slug: "textarea", name: "Textarea" },
      { slug: "switch", name: "Switch" },
      { slug: "checkbox", name: "Checkbox" },
      { slug: "radio-group", name: "RadioGroup" },
      { slug: "select", name: "Select" },
      { slug: "slider", name: "Slider" },
      { slug: "toggle-group", name: "ToggleGroup" },
      { slug: "file-upload", name: "FileUpload" },
    ],
  },
  {
    name: "Layout",
    items: [
      { slug: "card", name: "Card" },
      { slug: "grid", name: "Grid" },
      { slug: "divider", name: "Divider" },
      { slug: "hero", name: "Hero" },
      { slug: "pricing-card", name: "PricingCard" },
      { slug: "col", name: "Col" },
    ],
  },
  {
    name: "Data Display",
    items: [
      { slug: "badge", name: "Badge" },
      { slug: "avatar", name: "Avatar" },
      { slug: "progress", name: "Progress" },
      { slug: "skeleton", name: "Skeleton" },
      { slug: "spinner", name: "Spinner" },
      { slug: "data-table", name: "DataTable" },
      { slug: "stats-card", name: "StatsCard" },
      { slug: "bar-chart", name: "BarChart" },
      { slug: "donut-chart", name: "DonutChart" },
      { slug: "line-chart", name: "LineChart" },
      { slug: "heatmap", name: "Heatmap" },
      { slug: "comparison-table", name: "ComparisonTable" },
      { slug: "kanban-board", name: "KanbanBoard" },
      { slug: "tree-view", name: "TreeView" },
      { slug: "activity-feed", name: "ActivityFeed" },
    ],
  },
  {
    name: "Navigation",
    items: [
      { slug: "tabs", name: "Tabs" },
      { slug: "breadcrumb", name: "Breadcrumb" },
      { slug: "pagination", name: "Pagination" },
      { slug: "navbar", name: "Navbar" },
      { slug: "sidebar-nav", name: "Sidebar" },
      { slug: "bottom-nav", name: "BottomNav" },
      { slug: "browser-tabs", name: "BrowserTabs" },
      { slug: "mega-menu", name: "MegaMenu" },
      { slug: "speed-dial", name: "SpeedDial" },
    ],
  },
  {
    name: "Overlay",
    items: [
      { slug: "modal", name: "Modal" },
      { slug: "popover", name: "Popover" },
      { slug: "tooltip", name: "Tooltip" },
      { slug: "dropdown-menu", name: "DropdownMenu" },
      { slug: "context-menu", name: "ContextMenu" },
      { slug: "drawer", name: "Drawer" },
      { slug: "confirm-dialog", name: "ConfirmDialog" },
    ],
  },
  {
    name: "Feedback",
    items: [
      { slug: "alert", name: "Alert" },
      { slug: "toast", name: "Toast" },
      { slug: "announcement-bar", name: "AnnouncementBar" },
      { slug: "cookie-consent", name: "CookieConsent" },
      { slug: "loading-overlay", name: "LoadingOverlay" },
      { slug: "stepper", name: "Stepper" },
    ],
  },
  {
    name: "Disclosure",
    items: [
      { slug: "accordion", name: "Accordion" },
    ],
  },
  {
    name: "Date",
    items: [
      { slug: "calendar", name: "Calendar" },
      { slug: "date-picker", name: "DatePicker" },
    ],
  },
  {
    name: "Command",
    items: [
      { slug: "command", name: "Command" },
      { slug: "combobox", name: "Combobox" },
    ],
  },
  {
    name: "Animation",
    items: [
      { slug: "reveal", name: "Reveal" },
      { slug: "marquee", name: "Marquee" },
      { slug: "carousel", name: "Carousel" },
    ],
  },
];

export const DocsSidebar: React.FC<{
  mobileOpen: boolean;
  onClose: () => void;
}> = ({ mobileOpen, onClose }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCategory = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const sidebar = (
    <nav
      style={{
        width: "260px",
        minWidth: "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        padding: "16px 12px",
        background: "var(--neu-bg)",
        borderRight: "1px solid rgba(0,0,0,0.04)",
        transition: "background 0.35s ease",
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        onClick={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "16px",
          boxShadow: "var(--neu-shadow-raised-sm)",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #8490fa, #5a6cf5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 900,
            fontSize: "16px",
            boxShadow: "3px 3px 8px rgba(108,126,248,.3)",
          }}
        >
          N
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "15px", color: "var(--neu-text-primary)" }}>
            NeumorUI
          </div>
          <div style={{ fontSize: "10px", color: "var(--neu-text-muted)", fontWeight: 600 }}>
            Documentation
          </div>
        </div>
      </Link>

      {/* Home link */}
      <Link
        href="/"
        onClick={onClose}
        style={{
          display: "block",
          padding: "9px 12px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 700,
          color: pathname === "/" ? "var(--neu-accent, #6c7ef8)" : "var(--neu-text-secondary)",
          boxShadow: pathname === "/" ? "var(--neu-shadow-inset-sm)" : "none",
          marginBottom: "12px",
          transition: "all 0.2s ease",
        }}
      >
        Overview
      </Link>

      {/* Categories */}
      {categories.map((cat) => {
        const isCollapsed = collapsed[cat.name];
        return (
          <div key={cat.name} style={{ marginBottom: "6px" }}>
            <button
              onClick={() => toggleCategory(cat.name)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "7px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "inherit",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--neu-text-muted)",
                borderRadius: "8px",
                transition: "color 0.2s ease",
              }}
            >
              <span>{cat.name} ({cat.items.length})</span>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                style={{
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path d="M1 2l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {!isCollapsed && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginTop: "2px" }}>
                {cat.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      onClick={onClose}
                      style={{
                        display: "block",
                        padding: "7px 12px 7px 20px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? "var(--neu-accent, #6c7ef8)" : "var(--neu-text-secondary)",
                        boxShadow: isActive ? "var(--neu-shadow-inset-sm)" : "none",
                        transition: "all 0.15s ease",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        style={{
          display: "none",
        }}
        className="docs-sidebar-desktop"
      >
        {sidebar}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(4px)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            {sidebar}
          </div>
        </div>
      )}

      {/* Inline style for responsive sidebar */}
      <style>{`
        @media (min-width: 768px) {
          .docs-sidebar-desktop {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
