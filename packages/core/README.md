# neumorui

Neumorphic UI component library for React. **61 components**, dark mode, animations, TypeScript-first.

## Install

```bash
npm install neumorui
# or
pnpm add neumorui
```

Peer deps: `react >=18`, `react-dom >=18`.

## Setup

```tsx
import { NeuProvider } from "neumorui";
import "neumorui/styles";

function App() {
  return (
    <NeuProvider defaultTheme="light" defaultAccent="violet">
      <YourApp />
    </NeuProvider>
  );
}
```

## Quick Example

```tsx
import { Button, Input, Card, Switch, Grid, Col } from "neumorui";

function LoginForm() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Button variant="primary">Sign In</Button>
    </Card>
  );
}
```

## All 61 Components

### Form
```tsx
import { Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload } from "neumorui";

// Button — 8 variants: raised, flat, inset, pill, icon, primary, danger, success
<Button variant="primary" size="lg">Get started</Button>
<Button variant="danger">Delete</Button>
<Button variant="pill">Filter</Button>
<Button variant="icon">♡</Button>

// Input
<Input label="Email" leftIcon="✉" placeholder="you@example.com" />
<Input label="Password" type="password" error="Required" />

// Textarea
<Textarea label="Message" placeholder="Write here..." />

// Switch
<Switch label="Notifications" description="Push alerts" checked={on} onCheckedChange={setOn} />

// Checkbox
<Checkbox label="I agree to terms" checked={agree} onCheckedChange={setAgree} />

// RadioGroup
<RadioGroup
  name="plan"
  options={[
    { value: "free", label: "Free", description: "10 components" },
    { value: "pro", label: "Pro", description: "61+ components" },
  ]}
  defaultValue="pro"
/>

// Select
<Select
  label="Role"
  options={[
    { value: "designer", label: "Designer" },
    { value: "developer", label: "Developer" },
  ]}
  placeholder="Select role"
/>

// Slider
<Slider label="Volume" value={[60]} onValueChange={setVolume} />

// ToggleGroup
<ToggleGroup
  type="single"
  items={[
    { value: "all", label: "All" },
    { value: "design", label: "Design" },
    { value: "dev", label: "Dev" },
  ]}
  defaultValue="all"
/>

// FileUpload
<FileUpload accept="image/*" multiple onFilesChange={setFiles} />
```

### Layout
```tsx
import { Card, Grid, Col, Divider, Hero, PricingCard } from "neumorui";

// Card — 3 variants: raised, inset, flat
<Card variant="raised" padding="md">Content</Card>

// Grid + Col — 12-column system
<Grid cols={12} gap={16}>
  <Col span={7}><Card>Main</Card></Col>
  <Col span={5}><Card>Sidebar</Card></Col>
</Grid>

// Auto-fit responsive grid
<Grid minChildWidth="220px" gap={16}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>

// Divider
<Divider />
<Divider label="OR" />

// Hero
<Hero
  eyebrow="New Release"
  title={<>Build faster with <span style={{color: "var(--neu-accent)"}}>NeumorUI</span></>}
  subtitle="61 components with neumorphic design."
  actions={<Button variant="primary">Get started</Button>}
/>

// PricingCard
<PricingCard
  plans={[
    { name: "Free", price: "$0", period: "/mo",
      features: [{ label: "10 components", included: true }],
      cta: { label: "Start free", variant: "clay" } },
    { name: "Pro", price: "$12", period: "/mo", highlighted: true, badge: "Popular",
      features: [{ label: "61+ components", included: true }],
      cta: { label: "Get Pro", variant: "primary" } },
  ]}
/>
```

### Data Display
```tsx
import { Badge, Avatar, Progress, Skeleton, Spinner, DataTable, StatsCard, BarChart, DonutChart, LineChart, Heatmap, ComparisonTable } from "neumorui";

// Badge — 6 variants
<Badge variant="primary">Design</Badge>
<Badge variant="success" dot>Active</Badge>

// Avatar
<Avatar initials="RI" size="lg" status="online" />

// Progress
<Progress value={74} variant="default" showLabel label="Monthly goal" />

// Skeleton
<Skeleton variant="text" lines={3} />
<Skeleton variant="avatar" />

// Spinner
<Spinner size="md" variant="primary" label="Loading..." />

// StatsCard
<StatsCard label="Revenue" value="$48k" color="var(--neu-accent)" trend={{ value: "18%", direction: "up" }} />

// BarChart
<BarChart
  data={[
    { label: "Jan", value: 55 },
    { label: "Feb", value: 70 },
    { label: "Mar", value: 90 },
  ]}
  title="Monthly revenue"
/>

// DonutChart
<DonutChart
  segments={[
    { label: "Design", value: 42, color: "#6c7ef8" },
    { label: "Dev", value: 32, color: "#5ecba1" },
  ]}
  centerValue="74%"
  centerLabel="complete"
/>

// LineChart
<LineChart data={[{ label: "Mon", value: 320 }, { label: "Tue", value: 480 }]} />

// Heatmap
<Heatmap data={Array.from({ length: 91 }, () => Math.random())} />

// ComparisonTable
<ComparisonTable
  features={["Components", "Dark mode"]}
  plans={[
    { name: "Free", values: ["10", false] },
    { name: "Pro", highlight: true, values: ["61+", true] },
  ]}
/>
```

### Navigation
```tsx
import { Tabs, Breadcrumb, Pagination, Navbar, Sidebar, BottomNav, BrowserTabs, MegaMenu, SpeedDial } from "neumorui";

// Tabs
<Tabs tabs={[
  { value: "design", label: "Design", content: <p>Design content</p> },
  { value: "code", label: "Code", content: <p>Code content</p> },
]} />

// Breadcrumb
<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Button" },
]} />

// Pagination
<Pagination totalPages={10} currentPage={3} onPageChange={setPage} />

// Navbar
<Navbar
  brand="NeumorUI"
  links={[
    { label: "Home", href: "/", active: true },
    { label: "Docs", href: "/docs" },
  ]}
/>

// Sidebar
<Sidebar
  brand="NeumorUI"
  items={[
    { label: "Dashboard", icon: "🏠", badge: "3", active: true, group: "Main" },
    { label: "Settings", icon: "⚙️", group: "Account" },
  ]}
/>

// BottomNav
<BottomNav items={[
  { label: "Home", icon: "🏠" },
  { label: "Search", icon: "🔍" },
  { label: "Profile", icon: "👤" },
]} />

// BrowserTabs
<BrowserTabs
  tabs={[
    { id: "1", label: "Home", icon: "🏠", closable: true },
    { id: "2", label: "Docs", icon: "📖", badge: 5, closable: true },
  ]}
  activeTab="1"
  onTabChange={setActive}
  onTabClose={handleClose}
/>

// SpeedDial (FAB)
<SpeedDial actions={[
  { label: "Edit", icon: "✏️", color: "#5ecba1", onClick: handleEdit },
  { label: "Share", icon: "🔗", color: "#6c7ef8", onClick: handleShare },
]} />
```

### Overlay
```tsx
import { Modal, Popover, Tooltip, DropdownMenu, ContextMenu, Drawer, ConfirmDialog } from "neumorui";

// Modal
<Modal open={open} onOpenChange={setOpen} title="Settings" description="Manage preferences">
  <p>Modal content</p>
</Modal>

// Drawer
<Drawer open={open} onOpenChange={setOpen} side="right" title="Menu">
  <p>Drawer content</p>
</Drawer>

// Tooltip
<Tooltip content="Hello!">
  <Button variant="raised">Hover me</Button>
</Tooltip>

// DropdownMenu
<DropdownMenu
  trigger={<Button variant="raised">Menu</Button>}
  items={[
    { label: "Copy", icon: "📋", onSelect: handleCopy },
    { type: "separator" },
    { label: "Delete", icon: "🗑", danger: true, onSelect: handleDelete },
  ]}
/>

// ContextMenu (right-click)
<ContextMenu
  trigger={<div style={{ padding: "40px" }}>Right-click here</div>}
  items={[
    { label: "Copy", icon: "📋" },
    { label: "Paste", icon: "📌" },
    { separator: true },
    { label: "Delete", icon: "🗑", danger: true },
  ]}
/>

// ConfirmDialog
<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete account?"
  description="This action is permanent."
  variant="danger"
  confirmLabel="Delete forever"
  onConfirm={handleDelete}
/>
```

### Feedback
```tsx
import { Alert, ToastProvider, useToast, AnnouncementBar, CookieConsent, LoadingOverlay, Stepper } from "neumorui";

// Alert — 4 variants: info, success, warning, danger
<Alert variant="info" title="Update available">v2.0 is out!</Alert>
<Alert variant="danger" title="Error" onClose={() => {}}>Something went wrong.</Alert>

// Toast — wrap app in ToastProvider
<ToastProvider>
  <App />
</ToastProvider>

// Inside a component:
const { toast } = useToast();
toast({ message: "Saved!", variant: "success" });
toast({ message: "Error!", description: "Try again", variant: "danger", duration: 5000 });

// AnnouncementBar
<AnnouncementBar variant="gradient" icon="🚀" dismissible>
  NeumorUI v2.0 launched!
</AnnouncementBar>

// CookieConsent
<CookieConsent
  title="We use cookies"
  description="We use cookies to improve your experience."
  options={[
    { label: "Essential", required: true, defaultChecked: true },
    { label: "Analytics", defaultChecked: true },
    { label: "Marketing" },
  ]}
  onAccept={(selected) => console.log(selected)}
/>

// LoadingOverlay
<LoadingOverlay loading={isLoading} message="Fetching data...">
  <div>Your content here</div>
</LoadingOverlay>

// Stepper
<Stepper steps={[
  { label: "Order placed", status: "done" },
  { label: "In transit", status: "active" },
  { label: "Delivered", status: "pending" },
]} />
```

### Disclosure
```tsx
import { Accordion } from "neumorui";

<Accordion
  items={[
    { value: "1", title: "What is NeumorUI?", content: "A neumorphic React component library." },
    { value: "2", title: "Is it accessible?", content: "Yes — built on Radix primitives." },
  ]}
  defaultValue="1"
/>
```

### Date
```tsx
import { Calendar, DatePicker } from "neumorui";

<Calendar onDateSelect={setDate} />
<DatePicker label="Start date" value={date} onChange={setDate} />
```

### Command
```tsx
import { Command, Combobox } from "neumorui";

// Command palette
<Command
  open={open}
  onOpenChange={setOpen}
  items={[
    { value: "home", label: "Go to Dashboard", icon: "🏠", group: "Navigation" },
    { value: "theme", label: "Toggle Dark Mode", icon: "🌙", group: "Settings", onSelect: toggleTheme },
  ]}
/>

// Combobox
<Combobox
  label="Framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]}
  placeholder="Search frameworks..."
/>
```

### Animation
```tsx
import { Reveal, Marquee, Carousel } from "neumorui";

// Scroll reveal
<Reveal delay={100}>
  <Card>Appears on scroll</Card>
</Reveal>

// Marquee ticker
<Marquee speed={15}>
  <span>🚀 NeumorUI</span>
  <span>✨ 61 Components</span>
  <span>🌙 Dark Mode</span>
</Marquee>

// Carousel
<Carousel
  slides={[
    { content: <div>Slide 1</div>, background: "linear-gradient(135deg, #c8d0fd, #9aa2fb)" },
    { content: <div>Slide 2</div>, background: "linear-gradient(135deg, #9ee8c0, #6dd4a0)" },
  ]}
  autoPlay
  interval={4000}
/>
```

### Data
```tsx
import { KanbanBoard, TreeView, ActivityFeed } from "neumorui";

// KanbanBoard
<KanbanBoard columns={[
  { id: "todo", title: "To Do", items: [{ id: "1", title: "Design system audit", tag: { label: "Design", variant: "primary" } }] },
  { id: "done", title: "Done", items: [{ id: "2", title: "Initial wireframes" }] },
]} />

// TreeView
<TreeView nodes={[
  { label: "src", icon: "📁", children: [
    { label: "Button.tsx", icon: "📄" },
    { label: "Card.tsx", icon: "📄" },
  ]},
]} />

// ActivityFeed
<ActivityFeed items={[
  { user: "Rukon", action: "pushed to main", time: "2 min ago", color: "var(--neu-accent)" },
  { user: "Amina", action: "merged PR #42", time: "15 min ago", color: "var(--neu-success)" },
]} />
```

## Dark Mode

```tsx
// Auto (follows system preference)
<NeuProvider followSystemTheme>

// Manual toggle
const { theme, toggleTheme } = useNeuTheme();
<Button onClick={toggleTheme}>Toggle {theme}</Button>
```

## Theming

Override CSS variables:

```css
:root {
  --neu-bg: #f0f4ff;
  --neu-accent: #6c7ef8;
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

// Theme
const { theme, toggleTheme, setTheme, accent, setAccent, isDark } = useNeuTheme();

// Scroll reveal
const { ref, visible } = useReveal(0.12);

// Animated counter
const count = useCountUp(9240, 900, true);

// Click ripple
const { createRipple } = useRipple();
```

## Storybook

Live component playground: [rukonpro.github.io/neumorui](https://rukonpro.github.io/neumorui)

## License

MIT
