<p align="center">
  <img src="apps/docs/public/favicon.svg" width="80" alt="NeumorUI" />
</p>

<h1 align="center">NeumorUI</h1>

<p align="center">
  <strong>Beautiful clay-style React component library</strong><br/>
  118 components · Dark mode · Animations · TypeScript · Radix UI
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/neumorui"><img src="https://img.shields.io/npm/v/neumorui?style=flat-square&color=6c7ef8" alt="npm" /></a>
  <a href="https://github.com/rukonpro/neumorui/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" /></a>
  <a href="https://neumorui.vercel.app"><img src="https://img.shields.io/badge/docs-live-6c7ef8?style=flat-square" alt="docs" /></a>
  <a href="https://rukonpro.github.io/neumorui"><img src="https://img.shields.io/badge/storybook-live-ff4785?style=flat-square" alt="storybook" /></a>
</p>

---

## Install

```bash
npm install neumorui
# or
pnpm add neumorui
```

## Quick Start

```tsx
// 1. Wrap your app
import { NeuProvider } from "neumorui";
import "neumorui/styles";

function App() {
  return (
    <NeuProvider defaultTheme="light" defaultAccent="violet">
      <MyApp />
    </NeuProvider>
  );
}
```

```tsx
// 2. Use components
import { Button, Input, Card, Grid, Col, Badge } from "neumorui";

function LoginPage() {
  return (
    <Grid cols={12} gap={16}>
      <Col span={7}>
        <Card>
          <Input label="Email" leftIcon="✉" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button variant="primary" style={{ width: "100%" }}>Sign In</Button>
        </Card>
      </Col>
      <Col span={5}>
        <Card>
          <Badge variant="success" dot>Online</Badge>
        </Card>
      </Col>
    </Grid>
  );
}
```

## 118 Components

| Category | Components |
|---|---|
| **Form** (24) | Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload, OTPInput, Rating, TagInput, ColorPicker, SegmentedControl, PasswordInput, NumberInput, PhoneInput, PinInput, InputGroup, FormField, MultiSelect, RichTextEditor, MarkdownEditor |
| **Layout** (11) | Card, Grid, Col, Divider, Hero, PricingCard, AspectRatio, ScrollArea, ResizablePanels, Masonry, Container |
| **Data Display** (28) | Badge, Avatar, Progress, Skeleton, Spinner, DataTable, StatsCard, BarChart, DonutChart, LineChart, Heatmap, ComparisonTable, KanbanBoard, TreeView, ActivityFeed, Timeline, Chip, ImageGallery, Countdown, AreaChart, RadarChart, GaugeChart, Sparkline, UserCard, TestimonialCard, NotificationCard, CodeBlock, AvatarGroup |
| **Navigation** (15) | Tabs, Breadcrumb, Pagination, Navbar, Sidebar, BottomNav, BrowserTabs, MegaMenu, SpeedDial, BackToTop, Dock, Steps, LinkPreview, CommandMenu, TableOfContents |
| **Overlay** (8) | Modal, Popover, Tooltip, DropdownMenu, ContextMenu, Drawer, ConfirmDialog, Sheet |
| **Feedback** (10) | Alert, Toast, AnnouncementBar, CookieConsent, LoadingOverlay, Stepper, EmptyState, Snackbar, Banner, InlineMessage |
| **Disclosure** (1) | Accordion |
| **Date** (4) | Calendar, DatePicker, DateRangePicker, TimePicker |
| **Command** (2) | Command, Combobox |
| **Animation** (3) | Reveal, Marquee, Carousel |
| **Showpiece** (5) | MusicPlayerCard, WeatherCard, ChatBubble, NotificationCenter, Onboarding |
| **Media** (2) | AudioPlayer, VideoPlayer |
| **Utility** (5) | CopyButton, Kbd, InfiniteScroll, QRCode, ThemeCustomizer |

## Features

- **Clay/Neumorphic design** — Soft shadows, no hard borders, depth through light
- **Dark mode** — `<NeuProvider followSystemTheme>` or manual `toggleTheme()`
- **Fully customizable** — Every component accepts `className`, `style`, and `...rest` props
- **Animations** — Hover lifts, press effects, scroll reveal, count-up numbers, spring easing
- **Interactive feedback** — Raised/inset shadow states, drag/swipe, keyboard navigation
- **TypeScript** — Full type definitions, no `any`
- **Radix UI** — Accessible primitives for overlays, forms, and navigation
- **Pure inline styles** — No Tailwind required, zero CSS conflicts
- **Versioned docs** — Version selector dropdown, each release preserved on its own branch
- **335 tests** — Smoke tests for every component
- **Accessibility** — eslint-plugin-jsx-a11y, ARIA attributes, keyboard navigation
- **Live playground** — Interactive prop editor on docs pages
- **Global search** — Cmd+K component search across docs

## Dark Mode

```tsx
// Auto (follows system)
<NeuProvider followSystemTheme>

// Manual toggle
const { theme, toggleTheme } = useNeuTheme();
```

## Theming

Override CSS variables:

```css
:root {
  --neu-bg: #f0f4ff;
  --neu-accent: #6c7ef8;
  --neu-danger: #f87c6c;
  --neu-success: #5ecba1;
  --neu-radius-md: 14px;
  --neu-shadow-raised: 7px 7px 18px rgba(180,190,220,0.8), -5px -5px 14px rgba(255,255,255,0.95);
}

[data-theme="dark"] {
  --neu-bg: #1a1e32;
  --neu-accent: #7c8ffa;
}
```

## Hooks

```tsx
import { useNeuTheme, useReveal, useCountUp, useRipple, useSnackbar } from "neumorui";

const { theme, toggleTheme, isDark } = useNeuTheme();
const { ref, visible } = useReveal();
const count = useCountUp(9240);
const { createRipple } = useRipple();
const { snackbar } = useSnackbar();
```

## Links

| | Link |
|---|---|
| **Docs** | [neumorui.vercel.app](https://neumorui.vercel.app) |
| **npm** | [npmjs.com/package/neumorui](https://www.npmjs.com/package/neumorui) |
| **Storybook** | [rukonpro.github.io/neumorui](https://rukonpro.github.io/neumorui) |
| **GitHub** | [github.com/rukonpro/neumorui](https://github.com/rukonpro/neumorui) |

## Development

```bash
pnpm install
pnpm --filter neumorui build          # Build library
pnpm --filter docs dev                # Docs at localhost:3001
pnpm --filter @neumorui/storybook dev # Storybook at localhost:6006
pnpm --filter neumorui test           # 335 tests
pnpm build                            # Build all
```

## Releasing a New Version

```bash
# 1. Snapshot current docs to a version branch
./scripts/release-version.sh

# 2. Bump version in packages/core/package.json
# 3. Update apps/docs/src/data/versions.ts
# 4. Commit, push, and deploy
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-component`)
3. Commit changes (`git commit -m "feat: add MyComponent"`)
4. Push and open a PR

## License

MIT — [Rukon Islam](https://github.com/rukonpro)
