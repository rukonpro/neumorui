# NeumorUI

Neumorphic UI component library for React — **61 components**, TypeScript, dark mode, animations.

## Install

```bash
npm install neumorui
# or
pnpm add neumorui
```

## Setup

```tsx
import { NeuProvider } from "neumorui";
import "neumorui/styles";

<NeuProvider defaultTheme="light" defaultAccent="violet">
  <App />
</NeuProvider>
```

## Usage

```tsx
import { Button, Input, Card, Grid, Col } from "neumorui";

<Grid cols={12} gap={16}>
  <Col span={7}>
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Sign In</Button>
    </Card>
  </Col>
  <Col span={5}>
    <Card>Sidebar</Card>
  </Col>
</Grid>
```

## Components (61)

**Form** — Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload
**Layout** — Card, Grid, Col, Divider, Hero, PricingCard
**Data** — Badge, Avatar, Progress, Skeleton, Spinner, DataTable, StatsCard, BarChart, DonutChart, LineChart, Heatmap, ComparisonTable, KanbanBoard, TreeView, ActivityFeed
**Navigation** — Tabs, Breadcrumb, Pagination, Navbar, Sidebar, BottomNav, BrowserTabs, MegaMenu, SpeedDial
**Overlay** — Modal, Popover, Tooltip, DropdownMenu, ContextMenu, Drawer, ConfirmDialog
**Feedback** — Alert, Toast, AnnouncementBar, CookieConsent, LoadingOverlay, Stepper
**Disclosure** — Accordion
**Date** — Calendar, DatePicker
**Command** — Command, Combobox
**Animation** — Reveal, Marquee, Carousel

## Docs

See [packages/core/README.md](packages/core/README.md) for full API with code examples for every component.

## Storybook

Live playground: [rukonpro.github.io/neumorui](https://rukonpro.github.io/neumorui)

## Development

```bash
pnpm install
pnpm build
pnpm --filter @neumorui/storybook dev   # Storybook at localhost:6006
pnpm test                                # 206 tests
```

## License

MIT
