/**
 * Server-safe component metadata (no JSX / React imports).
 * Used by generateMetadata, sitemap, and JSON-LD — anything that runs on the server.
 */

export interface ComponentMeta {
  slug: string;
  name: string;
  category: string;
  description: string;
}

export const componentMeta: ComponentMeta[] = [
  // ── Form ──
  { slug: "button", name: "Button", category: "Form", description: "Clay-style button with 8 variants and 3 sizes. Supports loading state, icons, and ripple effect." },
  { slug: "input", name: "Input", category: "Form", description: "Neumorphic text input with inset shadow, label, helper text, error state, and icon slots." },
  { slug: "textarea", name: "Textarea", category: "Form", description: "Multi-line text input with neumorphic inset styling and auto-resize option." },
  { slug: "switch", name: "Switch", category: "Form", description: "Toggle switch built on Radix with clay-style track and thumb." },
  { slug: "checkbox", name: "Checkbox", category: "Form", description: "Radix-based checkbox with clay styling and animated checkmark." },
  { slug: "radio-group", name: "RadioGroup", category: "Form", description: "Radio button group built on Radix with clay-style indicator and optional descriptions." },
  { slug: "select", name: "Select", category: "Form", description: "Dropdown select built on Radix with clay styling and option groups." },
  { slug: "slider", name: "Slider", category: "Form", description: "Range slider built on Radix with clay track, thumb, and optional label/value display." },
  { slug: "toggle-group", name: "ToggleGroup", category: "Form", description: "Single or multi-select toggle group built on Radix with clay pill styling." },
  { slug: "file-upload", name: "FileUpload", category: "Form", description: "Drag-and-drop file upload zone with preview, progress, and validation." },

  // ── Layout ──
  { slug: "card", name: "Card", category: "Layout", description: "Versatile container with raised, inset, and flat variants. Hover lift animation on raised variant." },
  { slug: "grid", name: "Grid", category: "Layout", description: "CSS Grid wrapper with responsive column control and auto-fit support." },
  { slug: "divider", name: "Divider", category: "Layout", description: "Horizontal or vertical divider with optional label. Inset shadow styling." },
  { slug: "hero", name: "Hero", category: "Layout", description: "Full-width hero section with gradient background, eyebrow text, title, subtitle, and action buttons." },
  { slug: "pricing-card", name: "PricingCard", category: "Layout", description: "Pricing comparison cards with feature lists, highlighting, and CTA buttons." },
  { slug: "col", name: "Col", category: "Layout", description: "Grid column component for controlling span, start and end positions within a Grid." },

  // ── Data Display ──
  { slug: "badge", name: "Badge", category: "Data Display", description: "Small status indicator with 6 color variants and optional dot indicator." },
  { slug: "avatar", name: "Avatar", category: "Data Display", description: "User avatar with initials fallback, image support, and online status indicator." },
  { slug: "progress", name: "Progress", category: "Data Display", description: "Animated progress bar with gradient fill, label, and 4 color variants." },
  { slug: "skeleton", name: "Skeleton", category: "Data Display", description: "Shimmer loading placeholder with text, avatar, card, and rect variants." },
  { slug: "spinner", name: "Spinner", category: "Data Display", description: "Animated loading spinner with 4 sizes and color variants." },
  { slug: "data-table", name: "DataTable", category: "Data Display", description: "Feature-rich data table powered by TanStack Table with sorting and pagination." },
  { slug: "stats-card", name: "StatsCard", category: "Data Display", description: "Metric display card with trend indicator, label, value, and description." },
  { slug: "bar-chart", name: "BarChart", category: "Data Display", description: "Animated bar chart with hover tooltips and gradient fills." },
  { slug: "donut-chart", name: "DonutChart", category: "Data Display", description: "SVG donut/pie chart with animated segments and center label." },
  { slug: "line-chart", name: "LineChart", category: "Data Display", description: "SVG line chart with animated path, dots, and gradient fill area." },
  { slug: "heatmap", name: "Heatmap", category: "Data Display", description: "GitHub-style contribution heatmap grid with configurable colors." },
  { slug: "comparison-table", name: "ComparisonTable", category: "Data Display", description: "Feature comparison table for pricing or product pages with highlight support." },
  { slug: "kanban-board", name: "KanbanBoard", category: "Data Display", description: "Kanban board layout with columns, cards, tags, assignees, and progress bars." },
  { slug: "tree-view", name: "TreeView", category: "Data Display", description: "Expandable/collapsible tree view for hierarchical data with icons." },
  { slug: "activity-feed", name: "ActivityFeed", category: "Data Display", description: "Timeline-style activity feed with colored indicators and timestamps." },

  // ── Navigation ──
  { slug: "tabs", name: "Tabs", category: "Navigation", description: "Tab navigation built on Radix with pill and underline variants." },
  { slug: "breadcrumb", name: "Breadcrumb", category: "Navigation", description: "Breadcrumb navigation with clay chip styling and custom separator." },
  { slug: "pagination", name: "Pagination", category: "Navigation", description: "Page navigation with sibling ellipsis, multiple sizes, and clay styling." },
  { slug: "navbar", name: "Navbar", category: "Navigation", description: "Responsive navigation bar with logo, links, and action area." },
  { slug: "sidebar-nav", name: "Sidebar", category: "Navigation", description: "Vertical sidebar navigation with groups, icons, badges, and active indicator." },
  { slug: "bottom-nav", name: "BottomNav", category: "Navigation", description: "Mobile bottom navigation bar with icons, badges, and create button." },
  { slug: "browser-tabs", name: "BrowserTabs", category: "Navigation", description: "Browser-style tab bar with close buttons, add button, and badge support." },
  { slug: "mega-menu", name: "MegaMenu", category: "Navigation", description: "Dropdown mega menu with custom panel content for each menu item." },
  { slug: "speed-dial", name: "SpeedDial", category: "Navigation", description: "Floating action button that reveals a set of actions on click." },

  // ── Overlay ──
  { slug: "modal", name: "Modal", category: "Overlay", description: "Radix-based dialog with backdrop blur, 3 sizes, and clay styling." },
  { slug: "popover", name: "Popover", category: "Overlay", description: "Radix-based popover with configurable side, alignment, and clay shadow." },
  { slug: "tooltip", name: "Tooltip", category: "Overlay", description: "Radix tooltip with clay styling, configurable side and delay." },
  { slug: "dropdown-menu", name: "DropdownMenu", category: "Overlay", description: "Radix dropdown menu with items, separators, labels, shortcuts, and danger items." },
  { slug: "context-menu", name: "ContextMenu", category: "Overlay", description: "Right-click context menu with clay styling, icons, and separators." },
  { slug: "drawer", name: "Drawer", category: "Overlay", description: "Slide-in panel from left, right, or bottom with backdrop blur." },
  { slug: "confirm-dialog", name: "ConfirmDialog", category: "Overlay", description: "Confirmation dialog with danger variant, optional text input matching, and icon." },

  // ── Feedback ──
  { slug: "alert", name: "Alert", category: "Feedback", description: "Dismissible alert banner with 4 variants, icon, and title." },
  { slug: "toast", name: "Toast", category: "Feedback", description: "Toast notification system with ToastProvider and useToast hook. 4 variants with auto-dismiss." },
  { slug: "announcement-bar", name: "AnnouncementBar", category: "Feedback", description: "Dismissible banner with clay or gradient styling for announcements." },
  { slug: "cookie-consent", name: "CookieConsent", category: "Feedback", description: "GDPR cookie consent banner with toggleable category options." },
  { slug: "loading-overlay", name: "LoadingOverlay", category: "Feedback", description: "Semi-transparent overlay with spinner over content while loading." },
  { slug: "stepper", name: "Stepper", category: "Feedback", description: "Multi-step progress indicator with done, active, and pending states." },

  // ── Disclosure ──
  { slug: "accordion", name: "Accordion", category: "Disclosure", description: "Radix-based accordion with single or multiple expand modes and clay styling." },

  // ── Date ──
  { slug: "calendar", name: "Calendar", category: "Date", description: "Date calendar built on react-day-picker with clay styling." },
  { slug: "date-picker", name: "DatePicker", category: "Date", description: "Input + popover date picker with format control and min/max dates." },

  // ── Command ──
  { slug: "command", name: "Command", category: "Command", description: "Command palette (Cmd+K) built on cmdk with groups, shortcuts, and fuzzy search." },
  { slug: "combobox", name: "Combobox", category: "Command", description: "Searchable dropdown combobox built on cmdk + Radix popover." },

  // ── Animation ──
  { slug: "reveal", name: "Reveal", category: "Animation", description: "Scroll-triggered reveal animation using IntersectionObserver." },
  { slug: "marquee", name: "Marquee", category: "Animation", description: "Infinite horizontal scrolling marquee with configurable speed and direction." },
  { slug: "carousel", name: "Carousel", category: "Animation", description: "Slide carousel with prev/next buttons, dot indicators, and autoplay." },

  // ── New components ──
  { slug: "otp-input", name: "OTPInput", category: "Form", description: "One-time password input with auto-focus, masking, and paste support." },
  { slug: "rating", name: "Rating", category: "Form", description: "Star or heart rating selector with hover preview, half-star support, and read-only mode." },
  { slug: "timeline", name: "Timeline", category: "Data Display", description: "Vertical or horizontal event timeline with neumorphic nodes, connector lines, and hover animations." },
  { slug: "sheet", name: "Sheet", category: "Overlay", description: "Mobile-friendly bottom/side sheet with drag-to-dismiss, backdrop blur, and neumorphic handle." },
  { slug: "tag-input", name: "TagInput", category: "Form", description: "Multi-tag input with Enter/comma to add, Backspace to remove, paste support, and max limit." },
  { slug: "back-to-top", name: "BackToTop", category: "Navigation", description: "Floating scroll-to-top button with scroll threshold, smooth scroll, and neumorphic hover/press states." },
  { slug: "empty-state", name: "EmptyState", category: "Feedback", description: "Placeholder for empty pages with icon, title, description, and call-to-action button." },
  { slug: "chip", name: "Chip", category: "Data Display", description: "Removable and selectable chip/tag with raised, outlined, and filled variants." },
  { slug: "color-picker", name: "ColorPicker", category: "Form", description: "Neumorphic color picker with preset swatches, hex input, native picker fallback, and live preview." },
  { slug: "countdown", name: "Countdown", category: "Data Display", description: "Live countdown timer with flip animation, blinking separators, and customizable units." },
  { slug: "segmented-control", name: "SegmentedControl", category: "Form", description: "iOS-style segmented toggle with sliding neumorphic indicator, icon support, and fullWidth mode." },
];

export function getComponentMeta(slug: string): ComponentMeta | undefined {
  return componentMeta.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return componentMeta.map((c) => c.slug);
}
