<p align="center">
  <img src="apps/docs/public/favicon.svg" width="80" alt="NeumorUI" />
</p>

<h1 align="center">NeumorUI</h1>

<p align="center">
  <strong>Beautiful clay-style React component library</strong><br/>
  61 components · Dark mode · Animations · TypeScript · Radix UI
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/neumorui"><img src="https://img.shields.io/npm/v/neumorui?style=flat-square&color=6c7ef8" alt="npm" /></a>
  <a href="https://github.com/rukonpro/neumorui/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" /></a>
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

## 61 Components

| Category | Components |
|---|---|
| **Form** (10) | Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload |
| **Layout** (6) | Card, Grid, Col, Divider, Hero, PricingCard |
| **Data Display** (15) | Badge, Avatar, Progress, Skeleton, Spinner, DataTable, StatsCard, BarChart, DonutChart, LineChart, Heatmap, ComparisonTable, KanbanBoard, TreeView, ActivityFeed |
| **Navigation** (9) | Tabs, Breadcrumb, Pagination, Navbar, Sidebar, BottomNav, BrowserTabs, MegaMenu, SpeedDial |
| **Overlay** (7) | Modal, Popover, Tooltip, DropdownMenu, ContextMenu, Drawer, ConfirmDialog |
| **Feedback** (6) | Alert, Toast, AnnouncementBar, CookieConsent, LoadingOverlay, Stepper |
| **Disclosure** (1) | Accordion |
| **Date** (2) | Calendar, DatePicker |
| **Command** (2) | Command, Combobox |
| **Animation** (3) | Reveal, Marquee, Carousel |

## Features

- **Clay/Neumorphic design** — Soft shadows, no hard borders, depth through light
- **Dark mode** — `<NeuProvider followSystemTheme>` or manual `toggleTheme()`
- **Fully customizable** — Every component accepts `className`, `style`, and `...rest` props
- **Animations** — Hover lifts, press effects, scroll reveal, entrance animations, spring easing
- **TypeScript** — Full type definitions, no `any`
- **Radix UI** — Accessible primitives for overlays, forms, and navigation
- **Pure inline styles** — No Tailwind required, zero CSS conflicts
- **206 tests** — Smoke tests for every component

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
import { useNeuTheme, useReveal, useCountUp, useRipple } from "neumorui";

const { theme, toggleTheme, isDark } = useNeuTheme();
const { ref, visible } = useReveal();
const count = useCountUp(9240);
const { createRipple } = useRipple();
```

## Links

| | Link |
|---|---|
| **npm** | [npmjs.com/package/neumorui](https://www.npmjs.com/package/neumorui) |
| **Storybook** | [rukonpro.github.io/neumorui](https://rukonpro.github.io/neumorui) |
| **GitHub** | [github.com/rukonpro/neumorui](https://github.com/rukonpro/neumorui) |
| **Full API Docs** | [packages/core/README.md](packages/core/README.md) |

## Development

```bash
pnpm install
pnpm --filter neumorui build          # Build library
pnpm --filter docs dev                # Docs at localhost:3001
pnpm --filter @neumorui/storybook dev # Storybook at localhost:6006
pnpm --filter neumorui test           # 206 tests
pnpm build                            # Build all
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-component`)
3. Commit changes (`git commit -m "feat: add MyComponent"`)
4. Push and open a PR

## License

MIT — [Rukon Islam](https://github.com/rukonpro)
