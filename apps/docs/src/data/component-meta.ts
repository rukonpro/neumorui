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
  { slug: "image-gallery", name: "ImageGallery", category: "Data Display", description: "Responsive image grid with neumorphic hover effects, lightbox viewer, keyboard navigation, and captions." },
  { slug: "countdown", name: "Countdown", category: "Data Display", description: "Live countdown timer with flip animation, blinking separators, and customizable units." },
  { slug: "segmented-control", name: "SegmentedControl", category: "Form", description: "iOS-style segmented toggle with sliding neumorphic indicator, icon support, and fullWidth mode." },
  { slug: "music-player-card", name: "MusicPlayerCard", category: "Showpiece", description: "Full music player UI with album art, play controls, progress bar, like button, and shuffle/repeat." },
  { slug: "weather-card", name: "WeatherCard", category: "Showpiece", description: "Weather display card with temperature, condition icon, details chips, and multi-day forecast." },
  { slug: "chat-bubble", name: "ChatBubble", category: "Showpiece", description: "Chat message bubble with sent/received variants, avatar, name, timestamp, and read status." },
  { slug: "notification-center", name: "NotificationCenter", category: "Showpiece", description: "Dropdown notification panel with bell trigger, badge count, grouped items, read/unread, and clear." },
  { slug: "onboarding", name: "Onboarding", category: "Showpiece", description: "Step-by-step onboarding flow with spotlight highlight, tooltip, progress bar, and skip/next controls." },
  { slug: "audio-player", name: "AudioPlayer", category: "Media", description: "Neumorphic audio player with play/pause, seek bar, volume control, cover art, and time display." },
  { slug: "video-player", name: "VideoPlayer", category: "Media", description: "Custom video player with neumorphic overlay controls, seek, fullscreen, mute, and poster support." },
  { slug: "copy-button", name: "CopyButton", category: "Utility", description: "Click-to-copy button with Copied! feedback, raised/flat/icon variants, and clipboard API." },
  { slug: "kbd", name: "Kbd", category: "Utility", description: "Keyboard shortcut badge with neumorphic raised style and 3 sizes for displaying hotkeys." },
  { slug: "infinite-scroll", name: "InfiniteScroll", category: "Utility", description: "Auto-load more on scroll with IntersectionObserver, loading spinner, and end message." },
  { slug: "qr-code", name: "QRCode", category: "Utility", description: "QR code generator with neumorphic frame, rounded dots, custom colors, and optional label." },
  { slug: "snackbar", name: "Snackbar", category: "Feedback", description: "Bottom snackbar notification with action button, auto-dismiss, and 5 variants via useSnackbar hook." },
  { slug: "banner", name: "Banner", category: "Feedback", description: "Full-width banner for announcements with icon, action slot, dismiss button, and sticky mode." },
  { slug: "inline-message", name: "InlineMessage", category: "Feedback", description: "Inline contextual message with 4 variants, left border accent, and icon for form or section feedback." },
  { slug: "dock", name: "Dock", category: "Navigation", description: "macOS-style dock bar with icon magnification on hover, tooltips, and badge support." },
  { slug: "steps", name: "Steps", category: "Navigation", description: "Multi-step wizard with done/active/pending states, horizontal and vertical layout, and 3 sizes." },
  { slug: "link-preview", name: "LinkPreview", category: "Navigation", description: "Hover link preview card with image, title, description, favicon, and domain display." },
  { slug: "command-menu", name: "CommandMenu", category: "Navigation", description: "Cmd+K command palette with fuzzy search, grouped items, keyboard navigation, and shortcuts." },
  { slug: "aspect-ratio", name: "AspectRatio", category: "Layout", description: "Fixed aspect ratio container for images, videos, and embeds. Supports any custom ratio." },
  { slug: "scroll-area", name: "ScrollArea", category: "Layout", description: "Custom neumorphic scrollbar with auto-hide, drag support, and smooth scrolling." },
  { slug: "resizable-panels", name: "ResizablePanels", category: "Layout", description: "Draggable split pane with horizontal/vertical direction, min/max constraints, and touch support." },
  { slug: "masonry", name: "Masonry", category: "Layout", description: "Pinterest-style masonry grid layout with responsive column count and gap control." },
  { slug: "container", name: "Container", category: "Layout", description: "Responsive max-width container with 5 size presets, auto-centering, and optional padding." },
  { slug: "area-chart", name: "AreaChart", category: "Data Display", description: "Gradient-filled area chart with smooth bezier curves, grid lines, dots, and animated draw." },
  { slug: "radar-chart", name: "RadarChart", category: "Data Display", description: "Spider/radar chart for multi-axis comparison with animated fill, labels, and configurable rings." },
  { slug: "gauge-chart", name: "GaugeChart", category: "Data Display", description: "Circular gauge/speedometer with animated arc fill, auto-color based on value, and center label." },
  { slug: "sparkline", name: "Sparkline", category: "Data Display", description: "Tiny inline SVG chart for embedding in tables, stat cards, or inline text." },
  { slug: "user-card", name: "UserCard", category: "Data Display", description: "Profile card with cover, avatar, name, role, bio, and social link buttons." },
  { slug: "testimonial-card", name: "TestimonialCard", category: "Data Display", description: "Customer review card with quote, avatar, author name, role, and star rating." },
  { slug: "notification-card", name: "NotificationCard", category: "Data Display", description: "Notification list item with icon, title, description, timestamp, unread indicator, and dismiss." },
  { slug: "code-block", name: "CodeBlock", category: "Data Display", description: "Code display block with line numbers, language badge, copy button, and monospace styling." },
  { slug: "password-input", name: "PasswordInput", category: "Form", description: "Password input with eye toggle visibility, strength meter bar, and neumorphic inset styling." },
  { slug: "number-input", name: "NumberInput", category: "Form", description: "Numeric stepper input with neumorphic +/− buttons, min/max/step support, and mobile-friendly inputMode." },
  { slug: "phone-input", name: "PhoneInput", category: "Form", description: "International phone input with country flag dropdown, dial code, search, and auto-format." },
  { slug: "pin-input", name: "PinInput", category: "Form", description: "Individual digit PIN input with auto-focus advance, paste support, mask mode, and 3 sizes." },
  { slug: "input-group", name: "InputGroup", category: "Form", description: "Input wrapper with left/right addons and inline elements for prefix, suffix, and icon slots." },
  { slug: "form-field", name: "FormField", category: "Form", description: "Consistent form layout wrapper with label, error, helper text, required indicator, and horizontal mode." },
  { slug: "date-range-picker", name: "DateRangePicker", category: "Date", description: "Date range selector with calendar popover, start/end highlighting, and keyboard navigation." },
  { slug: "time-picker", name: "TimePicker", category: "Date", description: "Time selector with hour/minute spinners, AM/PM toggle, and 24-hour mode support." },
  { slug: "table-of-contents", name: "TableOfContents", category: "Navigation", description: "Auto-tracking table of contents with scroll spy, indented headings, and active indicator." },
  { slug: "theme-customizer", name: "ThemeCustomizer", category: "Utility", description: "Live theme editor with color presets, custom color pickers, and border radius control." },
  { slug: "multi-select", name: "MultiSelect", category: "Form", description: "Multi-option dropdown with tag chips, search filter, checkbox indicators, and max limit." },
  { slug: "avatar-group", name: "AvatarGroup", category: "Data Display", description: "Stacked avatar group with overlap, hover lift, +N overflow indicator, and initials fallback." },
  { slug: "rich-text-editor", name: "RichTextEditor", category: "Form", description: "WYSIWYG rich text editor with formatting toolbar, headings, lists, links, and code blocks." },
  { slug: "markdown-editor", name: "MarkdownEditor", category: "Form", description: "Split-pane markdown editor with write/preview tabs, live rendering, and monospace input." },
  { slug: "alert-dialog", name: "AlertDialog", category: "Overlay", description: "Popup alert/confirm dialog with OK/Cancel buttons, 5 variants, icon, and useAlertDialog hook." },
  { slug: "chat-input", name: "ChatInput", category: "AI Chat", description: "Auto-expanding chat input with send button, attachment support, Enter to send, and character count." },
  { slug: "message-list", name: "MessageList", category: "AI Chat", description: "Scrollable chat message container with auto-scroll, day separators, and user/assistant/system roles." },
  { slug: "streaming-text", name: "StreamingText", category: "AI Chat", description: "Typewriter streaming text effect with blinking cursor, skip-on-click, and imperative ref handle." },
  { slug: "thinking-indicator", name: "ThinkingIndicator", category: "AI Chat", description: "Animated AI thinking indicator with dots, wave, pulse, and typing variants in 3 sizes." },
  { slug: "prompt-card", name: "PromptCard", category: "AI Chat", description: "Clickable AI prompt suggestion card with icon, title, description, and category badge." },
];

/** Total number of components — use this instead of hardcoding counts. */
export const TOTAL_COMPONENTS = componentMeta.length;

export function getComponentMeta(slug: string): ComponentMeta | undefined {
  return componentMeta.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return componentMeta.map((c) => c.slug);
}
