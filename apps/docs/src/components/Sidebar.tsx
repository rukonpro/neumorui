"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VersionSelector } from "@/components/VersionSelector";

interface SidebarCategory {
  name: string;
  icon: string;
  items: { slug: string; name: string }[];
}

const categories: SidebarCategory[] = [
  {
    name: "Form",
    icon: "📝",
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
      { slug: "otp-input", name: "OTPInput" },
      { slug: "rating", name: "Rating" },
      { slug: "tag-input", name: "TagInput" },
      { slug: "color-picker", name: "ColorPicker" },
      { slug: "segmented-control", name: "SegmentedControl" },
      { slug: "password-input", name: "PasswordInput" },
      { slug: "number-input", name: "NumberInput" },
      { slug: "phone-input", name: "PhoneInput" },
      { slug: "pin-input", name: "PinInput" },
      { slug: "input-group", name: "InputGroup" },
      { slug: "form-field", name: "FormField" },
      { slug: "multi-select", name: "MultiSelect" },
      { slug: "rich-text-editor", name: "RichTextEditor" },
      { slug: "markdown-editor", name: "MarkdownEditor" },
    ],
  },
  {
    name: "Layout",
    icon: "🏗️",
    items: [
      { slug: "card", name: "Card" },
      { slug: "grid", name: "Grid" },
      { slug: "divider", name: "Divider" },
      { slug: "hero", name: "Hero" },
      { slug: "pricing-card", name: "PricingCard" },
      { slug: "col", name: "Col" },
      { slug: "aspect-ratio", name: "AspectRatio" },
      { slug: "scroll-area", name: "ScrollArea" },
      { slug: "resizable-panels", name: "ResizablePanels" },
      { slug: "masonry", name: "Masonry" },
      { slug: "container", name: "Container" },
    ],
  },
  {
    name: "Data Display",
    icon: "📊",
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
      { slug: "timeline", name: "Timeline" },
      { slug: "chip", name: "Chip" },
      { slug: "image-gallery", name: "ImageGallery" },
      { slug: "countdown", name: "Countdown" },
      { slug: "area-chart", name: "AreaChart" },
      { slug: "radar-chart", name: "RadarChart" },
      { slug: "gauge-chart", name: "GaugeChart" },
      { slug: "sparkline", name: "Sparkline" },
      { slug: "user-card", name: "UserCard" },
      { slug: "testimonial-card", name: "TestimonialCard" },
      { slug: "notification-card", name: "NotificationCard" },
      { slug: "code-block", name: "CodeBlock" },
      { slug: "avatar-group", name: "AvatarGroup" },
    ],
  },
  {
    name: "Navigation",
    icon: "🧭",
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
      { slug: "back-to-top", name: "BackToTop" },
      { slug: "dock", name: "Dock" },
      { slug: "steps", name: "Steps" },
      { slug: "link-preview", name: "LinkPreview" },
      { slug: "command-menu", name: "CommandMenu" },
      { slug: "table-of-contents", name: "TableOfContents" },
    ],
  },
  {
    name: "Overlay",
    icon: "🪟",
    items: [
      { slug: "modal", name: "Modal" },
      { slug: "popover", name: "Popover" },
      { slug: "tooltip", name: "Tooltip" },
      { slug: "dropdown-menu", name: "DropdownMenu" },
      { slug: "context-menu", name: "ContextMenu" },
      { slug: "drawer", name: "Drawer" },
      { slug: "confirm-dialog", name: "ConfirmDialog" },
      { slug: "sheet", name: "Sheet" },
      { slug: "alert-dialog", name: "AlertDialog" },
    ],
  },
  {
    name: "Feedback",
    icon: "💬",
    items: [
      { slug: "alert", name: "Alert" },
      { slug: "toast", name: "Toast" },
      { slug: "announcement-bar", name: "AnnouncementBar" },
      { slug: "cookie-consent", name: "CookieConsent" },
      { slug: "loading-overlay", name: "LoadingOverlay" },
      { slug: "stepper", name: "Stepper" },
      { slug: "empty-state", name: "EmptyState" },
      { slug: "snackbar", name: "Snackbar" },
      { slug: "banner", name: "Banner" },
      { slug: "inline-message", name: "InlineMessage" },
    ],
  },
  {
    name: "Disclosure",
    icon: "📂",
    items: [{ slug: "accordion", name: "Accordion" }],
  },
  {
    name: "Date",
    icon: "📅",
    items: [
      { slug: "calendar", name: "Calendar" },
      { slug: "date-picker", name: "DatePicker" },
      { slug: "date-range-picker", name: "DateRangePicker" },
      { slug: "time-picker", name: "TimePicker" },
    ],
  },
  {
    name: "Command",
    icon: "⌘",
    items: [
      { slug: "command", name: "Command" },
      { slug: "combobox", name: "Combobox" },
    ],
  },
  {
    name: "Animation",
    icon: "✨",
    items: [
      { slug: "reveal", name: "Reveal" },
      { slug: "marquee", name: "Marquee" },
      { slug: "carousel", name: "Carousel" },
    ],
  },
  {
    name: "Showpiece",
    icon: "💎",
    items: [
      { slug: "music-player-card", name: "MusicPlayerCard" },
      { slug: "weather-card", name: "WeatherCard" },
      { slug: "chat-bubble", name: "ChatBubble" },
      { slug: "notification-center", name: "NotificationCenter" },
      { slug: "onboarding", name: "Onboarding" },
    ],
  },
  {
    name: "Media",
    icon: "🎬",
    items: [
      { slug: "audio-player", name: "AudioPlayer" },
      { slug: "video-player", name: "VideoPlayer" },
    ],
  },
  {
    name: "Utility",
    icon: "🔧",
    items: [
      { slug: "copy-button", name: "CopyButton" },
      { slug: "kbd", name: "Kbd" },
      { slug: "infinite-scroll", name: "InfiniteScroll" },
      { slug: "qr-code", name: "QRCode" },
      { slug: "theme-customizer", name: "ThemeCustomizer" },
    ],
  },
  {
    name: "AI Chat",
    icon: "🤖",
    items: [
      { slug: "chat-input", name: "ChatInput" },
      { slug: "message-list", name: "MessageList" },
      { slug: "streaming-text", name: "StreamingText" },
      { slug: "thinking-indicator", name: "ThinkingIndicator" },
      { slug: "prompt-card", name: "PromptCard" },
    ],
  },
];

export const DocsSidebar: React.FC<{
  mobileOpen: boolean;
  onClose: () => void;
}> = ({ mobileOpen, onClose }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const toggleCategory = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredCategories = search
    ? categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : categories;

  const sidebar = (
    <nav
      style={{
        width: "270px",
        minWidth: "270px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        padding: "0 12px 16px",
        background: "var(--neu-bg)",
        borderRight: "1px solid rgba(0,0,0,0.04)",
        transition: "background 0.35s ease",
      }}
    >
      {/* Brand + Search — sticky */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--neu-bg)",
          paddingTop: "16px",
          paddingBottom: "12px",
          marginBottom: "4px",
          marginLeft: "-12px",
          marginRight: "-12px",
          paddingLeft: "12px",
          paddingRight: "12px",
          boxShadow: "0 8px 16px var(--neu-bg)",
          transition: "background 0.35s ease",
        }}
      >
      <Link
        href="/"
        onClick={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px",
          borderRadius: "16px",
          boxShadow: "var(--neu-shadow-raised-sm)",
          textDecoration: "none",
          marginBottom: "10px",
          transition: "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
        }}
      >
        <img src="/favicon.svg" alt="NeumorUI" style={{ width: "32px", height: "32px" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: "15px", color: "var(--neu-text-primary)", letterSpacing: "-0.02em" }}>
            NeumorUI
          </div>
          <div style={{ fontSize: "10px", color: "var(--neu-text-muted)", fontWeight: 600 }}>
            {categories.reduce((sum, cat) => sum + cat.items.length, 0)} Components
          </div>
        </div>
      </Link>

      {/* Version Selector */}
      <div style={{ marginBottom: "10px" }}>
        <VersionSelector />
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "14px" }}>
        <span
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "13px",
            color: "var(--neu-text-muted)",
            pointerEvents: "none",
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px 10px 36px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "inherit",
            color: "var(--neu-text-primary)",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
            transition: "box-shadow 0.2s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow =
              "var(--neu-shadow-inset-sm), 0 0 0 2px rgba(108,126,248,.2)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "var(--neu-shadow-inset-sm)";
          }}
        />
      </div>

      </div>
      {/* Home link */}
      <Link
        href="/"
        onClick={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 12px",
          borderRadius: "11px",
          fontSize: "13px",
          fontWeight: 700,
          color: pathname === "/" ? "var(--neu-accent)" : "var(--neu-text-secondary)",
          boxShadow: pathname === "/" ? "var(--neu-shadow-inset-sm)" : "none",
          marginBottom: "8px",
          transition: "all 0.2s ease",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "14px" }}>🏠</span>
        Overview
      </Link>

      {/* Categories */}
      {filteredCategories.map((cat) => {
        const isCollapsed = collapsed[cat.name] && !search;
        const hasActive = cat.items.some((item) => pathname === `/docs/${item.slug}`);
        return (
          <div key={cat.name} style={{ marginBottom: "4px" }}>
            <button
              onClick={() => toggleCategory(cat.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "inherit",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: hasActive ? "var(--neu-accent)" : "var(--neu-text-muted)",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "12px" }}>{cat.icon}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{cat.name}</span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: "999px",
                  background: hasActive ? "rgba(108,126,248,0.12)" : "rgba(0,0,0,0.04)",
                  color: hasActive ? "var(--neu-accent)" : "var(--neu-text-muted)",
                }}
              >
                {cat.items.length}
              </span>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                style={{
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <path d="M1 2l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {!isCollapsed && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginTop: "2px", marginLeft: "4px", paddingLeft: "12px", borderLeft: "2px solid rgba(108,126,248,0.08)" }}>
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
                        padding: "7px 12px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? "var(--neu-accent)" : "var(--neu-text-secondary)",
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
      <div style={{ display: "none" }} className="docs-sidebar-desktop">
        {sidebar}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(4px)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>{sidebar}</div>
        </div>
      )}

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
