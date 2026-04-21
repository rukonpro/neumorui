"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Switch,
  Checkbox,
  RadioGroup,
  Select,
  Slider,
  ToggleGroup,
  FileUpload,
  Card,
  Grid,
  Col,
  Divider,
  Hero,
  PricingCard,
  Badge,
  Avatar,
  Progress,
  Skeleton,
  Spinner,
  DataTable,
  StatsCard,
  BarChart,
  DonutChart,
  LineChart,
  Heatmap,
  ComparisonTable,
  KanbanBoard,
  TreeView,
  ActivityFeed,
  Tabs,
  Breadcrumb,
  Pagination,
  Navbar,
  Sidebar,
  BottomNav,
  BrowserTabs,
  MegaMenu,
  SpeedDial,
  Modal,
  Popover,
  Tooltip,
  DropdownMenu,
  ContextMenu,
  Drawer,
  ConfirmDialog,
  Alert,
  ToastProvider,
  useToast,
  AnnouncementBar,
  CookieConsent,
  LoadingOverlay,
  Stepper,
  Accordion,
  Calendar,
  DatePicker,
  Command,
  Combobox,
  Reveal,
  Marquee,
  MarqueeItem,
  Carousel,
  OTPInput,
  Rating,
  Timeline,
  Sheet,
  TagInput,
  BackToTop,
  EmptyState,
  Chip,
  ColorPicker,
  SegmentedControl,
  Countdown,
  ImageGallery,
  PasswordInput,
  NumberInput,
  PhoneInput,
  PinInput,
  InputGroup,
  FormField,
  AreaChart,
  RadarChart,
  GaugeChart,
  Sparkline,
  UserCard,
  TestimonialCard,
  NotificationCard,
  CodeBlock,
  AspectRatio,
  ScrollArea,
  ResizablePanels,
  Masonry,
  Container,
  Dock,
  Steps,
  LinkPreview,
  CommandMenu,
  SnackbarProvider,
  useSnackbar,
  Banner,
  InlineMessage,
  AudioPlayer,
  VideoPlayer,
  CopyButton,
  Kbd,
  InfiniteScroll,
  QRCode,
  MusicPlayerCard,
  WeatherCard,
  ChatBubble,
  NotificationCenter,
  Onboarding,
  DateRangePicker,
  TimePicker,
  TableOfContents,
  ThemeCustomizer,
  MultiSelect,
  AvatarGroup,
  RichTextEditor,
  MarkdownEditor,
  AlertDialog,
  AlertDialogProvider,
  useAlertDialog,
  ChatInput,
  MessageList,
  StreamingText,
  ThinkingIndicator,
  PromptCard,
  PromptGrid,
} from "neumorui";

/* ─── Prop type definition ─── */
export interface PropDef {
  name: string;
  type: string;
  default: string;
  description?: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  props: PropDef[];
  component?: React.ComponentType<Record<string, unknown>>;
  defaultProps?: Record<string, unknown>;
}

/* ─── Small demo wrappers (with state) ─── */

function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="raised">Raised</Button>
      <Button variant="flat">Flat</Button>
      <Button variant="inset">Inset</Button>
      <Button variant="pill">Pill</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button
        variant="primary"
        loading={loading}
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}
      >
        {loading ? "Loading..." : "Click me"}
      </Button>
    </div>
  );
}

function InputDemo() {
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px" }}>
      <Input label="Name" placeholder="Enter your name" value={val} onChange={(e) => setVal(e.target.value)} />
      <Input label="Email" placeholder="hello@example.com" leftIcon={<span>@</span>} />
      <Input label="Password" error="Password is required" />
    </div>
  );
}

function TextareaDemo() {
  return <Textarea label="Message" placeholder="Write something..." helperText="Max 500 characters" />;
}

function SwitchDemo() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
      <Switch label="Dark mode" description="Toggle the theme" checked={on} onCheckedChange={setOn} />
      <Switch label="Notifications" checked={true} />
      <Switch label="Disabled" disabled />
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} />
      <Checkbox label="Subscribe to newsletter" />
      <Checkbox label="Disabled option" disabled />
    </div>
  );
}

function RadioGroupDemo() {
  const [val, setVal] = useState("option1");
  return (
    <RadioGroup
      label="Choose a plan"
      value={val}
      onValueChange={setVal}
      options={[
        { value: "option1", label: "Free", description: "Basic features" },
        { value: "option2", label: "Pro", description: "All features" },
        { value: "option3", label: "Enterprise", description: "Custom" },
      ]}
    />
  );
}

function SelectDemo() {
  const [val, setVal] = useState("");
  return (
    <div style={{ maxWidth: "300px" }}>
      <Select
        label="Framework"
        placeholder="Choose one..."
        value={val}
        onValueChange={setVal}
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "svelte", label: "Svelte" },
          { value: "angular", label: "Angular", disabled: true },
        ]}
      />
    </div>
  );
}

function SliderDemo() {
  const [val, setVal] = useState([50]);
  return (
    <div style={{ maxWidth: "360px" }}>
      <Slider label="Volume" value={val} onValueChange={setVal} min={0} max={100} />
    </div>
  );
}

function ToggleGroupDemo() {
  const [val, setVal] = useState("center");
  return (
    <ToggleGroup
      type="single"
      value={val}
      onValueChange={setVal}
      options={[
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ]}
    />
  );
}

function FileUploadDemo() {
  return <FileUpload label="Upload files" hint="PNG, JPG up to 5MB" multiple accept="image/*" maxSize={5 * 1024 * 1024} />;
}

function CardDemo() {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card variant="raised" style={{ width: "200px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "6px" }}>Raised</h3>
        <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Default card style with lifted shadow.</p>
      </Card>
      <Card variant="inset" style={{ width: "200px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "6px" }}>Inset</h3>
        <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Pressed-in shadow effect.</p>
      </Card>
      <Card variant="flat" style={{ width: "200px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "6px" }}>Flat</h3>
        <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>No shadow, minimal style.</p>
      </Card>
    </div>
  );
}

function GridDemo() {
  return (
    <Grid cols={3} gap={24}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            padding: "16px",
            borderRadius: "14px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          Cell {i}
        </div>
      ))}
    </Grid>
  );
}

function ColDemo() {
  return (
    <Grid cols={12} gap={24}>
      <Col span={4}>
        <div style={{ padding: "12px", borderRadius: "12px", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", textAlign: "center", fontWeight: 700, fontSize: "13px" }}>
          span=4
        </div>
      </Col>
      <Col span={8}>
        <div style={{ padding: "12px", borderRadius: "12px", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", textAlign: "center", fontWeight: 700, fontSize: "13px" }}>
          span=8
        </div>
      </Col>
    </Grid>
  );
}

function DividerDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ fontSize: "13px" }}>Content above</p>
      <Divider />
      <p style={{ fontSize: "13px" }}>Content below</p>
      <Divider label="OR" />
      <p style={{ fontSize: "13px" }}>Alternative content</p>
    </div>
  );
}

function HeroDemo() {
  return (
    <Hero
      eyebrow="Introducing NeumorUI"
      title="Beautiful clay-style components"
      subtitle="Build stunning neumorphic interfaces with React and TypeScript"
      actions={
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button variant="primary">Get started</Button>
          <Button variant="raised">Learn more</Button>
        </div>
      }
    />
  );
}

function PricingCardDemo() {
  return (
    <PricingCard
      plans={[
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          features: [
            { label: "5 projects", included: true },
            { label: "Basic support", included: true },
            { label: "API access", included: false },
            { label: "Custom domain", included: false },
          ],
          cta: { label: "Start free" },
        },
        {
          name: "Pro",
          price: "$19",
          period: "/mo",
          highlighted: true,
          badge: "Popular",
          features: [
            { label: "Unlimited projects", included: true },
            { label: "Priority support", included: true },
            { label: "API access", included: true },
            { label: "Custom domain", included: false },
          ],
          cta: { label: "Upgrade", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "$49",
          period: "/mo",
          features: [
            { label: "Unlimited projects", included: true },
            { label: "24/7 support", included: true },
            { label: "API access", included: true },
            { label: "Custom domain", included: true },
          ],
          cta: { label: "Contact us" },
        },
      ]}
    />
  );
}

function BadgeDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="primary" dot>With dot</Badge>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar initials="JD" size="sm" />
      <Avatar initials="AB" size="md" status="online" />
      <Avatar initials="CD" size="lg" status="busy" />
      <Avatar initials="EF" size="xl" status="away" />
    </div>
  );
}

function ProgressDemo() {
  const [val, setVal] = useState(65);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <Progress value={val} label="Upload progress" showLabel />
      <Progress value={80} variant="success" showLabel />
      <Progress value={30} variant="danger" showLabel />
      <Button size="sm" variant="raised" onClick={() => setVal(Math.min(val + 10, 100))}>
        Increase
      </Button>
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
      <Skeleton variant="avatar" />
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="rect" height={80} />
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" variant="primary" />
      <Spinner size="xl" variant="success" label="Loading..." />
    </div>
  );
}

function DataTableDemo() {
  const columns = [
    { accessorKey: "name" as const, header: "Name" },
    { accessorKey: "role" as const, header: "Role" },
    { accessorKey: "status" as const, header: "Status" },
  ];
  const data = [
    { name: "Alice", role: "Engineer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Active" },
    { name: "Charlie", role: "PM", status: "Away" },
    { name: "Diana", role: "Engineer", status: "Active" },
  ];
  return <DataTable columns={columns} data={data} pageSize={5} />;
}

function StatsCardDemo() {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <StatsCard label="Revenue" value="$12,340" trend={{ value: "+12%", direction: "up" }} />
      <StatsCard label="Users" value="1,024" trend={{ value: "-3%", direction: "down" }} />
      <StatsCard label="Orders" value="384" description="Last 30 days" />
    </div>
  );
}

function BarChartDemo() {
  return (
    <div style={{ maxWidth: "400px" }}>
      <BarChart
        title="Weekly Sales"
        data={[
          { label: "Mon", value: 40 },
          { label: "Tue", value: 65 },
          { label: "Wed", value: 50 },
          { label: "Thu", value: 80 },
          { label: "Fri", value: 70 },
          { label: "Sat", value: 55 },
          { label: "Sun", value: 90 },
        ]}
      />
    </div>
  );
}

function DonutChartDemo() {
  return (
    <DonutChart
      segments={[
        { label: "React", value: 45, color: "#6c7ef8" },
        { label: "Vue", value: 25, color: "#4dbfa0" },
        { label: "Svelte", value: 20, color: "#e8a84b" },
        { label: "Angular", value: 10, color: "#e07090" },
      ]}
      centerLabel="Total"
      centerValue="100%"
    />
  );
}

function LineChartDemo() {
  return (
    <div style={{ maxWidth: "500px" }}>
      <LineChart
        data={[
          { label: "Jan", value: 30 },
          { label: "Feb", value: 45 },
          { label: "Mar", value: 38 },
          { label: "Apr", value: 65 },
          { label: "May", value: 52 },
          { label: "Jun", value: 70 },
        ]}
      />
    </div>
  );
}

function HeatmapDemo() {
  const data = Array.from({ length: 91 }, () => Math.random());
  return <Heatmap data={data} cols={13} rows={7} />;
}

function ComparisonTableDemo() {
  return (
    <ComparisonTable
      features={["Storage", "Users", "Support", "API"]}
      plans={[
        { name: "Free", values: ["1 GB", "1", false, false] },
        { name: "Pro", highlight: true, values: ["50 GB", "10", true, true] },
        { name: "Enterprise", values: ["Unlimited", "Unlimited", true, true] },
      ]}
    />
  );
}

function KanbanBoardDemo() {
  return (
    <KanbanBoard
      columns={[
        {
          id: "todo",
          title: "To Do",
          count: 2,
          items: [
            { id: "1", title: "Design homepage", tag: { label: "Design", variant: "blue" } },
            { id: "2", title: "Write docs", tag: { label: "Docs", variant: "green" } },
          ],
        },
        {
          id: "progress",
          title: "In Progress",
          count: 1,
          items: [
            { id: "3", title: "Build components", tag: { label: "Dev", variant: "coral" }, progress: 60 },
          ],
        },
        {
          id: "done",
          title: "Done",
          count: 1,
          items: [
            { id: "4", title: "Setup project", tag: { label: "Dev", variant: "green" } },
          ],
        },
      ]}
    />
  );
}

function TreeViewDemo() {
  return (
    <div style={{ maxWidth: "300px" }}>
      <TreeView
        nodes={[
          {
            label: "src",
            children: [
              {
                label: "components",
                children: [
                  { label: "Button.tsx" },
                  { label: "Card.tsx" },
                ],
              },
              { label: "index.ts" },
            ],
          },
          { label: "package.json" },
          { label: "README.md" },
        ]}
      />
    </div>
  );
}

function ActivityFeedDemo() {
  return (
    <div style={{ maxWidth: "400px" }}>
      <ActivityFeed
        items={[
          { user: "Alice", action: "pushed 3 commits to main", time: "2 min ago", color: "#6c7ef8" },
          { user: "Bob", action: "opened pull request #42", time: "15 min ago", color: "#4dbfa0" },
          { user: "Charlie", action: "commented on issue #18", time: "1 hour ago", color: "#e8a84b" },
          { user: "Diana", action: "merged branch feature/ui", time: "3 hours ago", color: "#e07090" },
        ]}
      />
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs
      tabs={[
        { value: "preview", label: "Preview", content: <p style={{ padding: "16px", fontSize: "13px" }}>Preview content here</p> },
        { value: "code", label: "Code", content: <p style={{ padding: "16px", fontSize: "13px" }}>Code content here</p> },
        { value: "props", label: "Props", content: <p style={{ padding: "16px", fontSize: "13px" }}>Props content here</p> },
      ]}
    />
  );
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Breadcrumb" },
      ]}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} total={10} onChange={setPage} />;
}

function NavbarDemo() {
  return (
    <Navbar
      brand="NeumorUI"
      links={[
        { label: "Home", href: "#", active: true },
        { label: "Docs", href: "#" },
        { label: "GitHub", href: "#" },
      ]}
      actions={<Button variant="primary" size="sm">Sign in</Button>}
    />
  );
}

function SidebarNavDemo() {
  return (
    <div style={{ maxWidth: "260px" }}>
      <Sidebar
        brand="Dashboard"
        items={[
          { label: "Overview", icon: <span>O</span>, active: true },
          { label: "Analytics", icon: <span>A</span>, badge: "3" },
          { label: "Settings", icon: <span>S</span>, group: "System" },
          { label: "Users", icon: <span>U</span>, group: "System" },
        ]}
      />
    </div>
  );
}

function BottomNavDemo() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ maxWidth: "400px" }}>
      <BottomNav
        activeIndex={active}
        onActiveChange={setActive}
        items={[
          { label: "Home", icon: <span>H</span> },
          { label: "Search", icon: <span>S</span> },
          { label: "Add", icon: <span>+</span>, isCreate: true },
          { label: "Inbox", icon: <span>I</span>, badge: 5 },
          { label: "Profile", icon: <span>P</span> },
        ]}
      />
    </div>
  );
}

function BrowserTabsDemo() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [tabs, setTabs] = useState([
    { id: "tab1", label: "index.tsx", closable: true },
    { id: "tab2", label: "styles.css", closable: true },
    { id: "tab3", label: "README.md", closable: true },
  ]);
  return (
    <BrowserTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onTabClose={(id) => setTabs(tabs.filter((t) => t.id !== id))}
    />
  );
}

function MegaMenuDemo() {
  return (
    <MegaMenu
      items={[
        {
          label: "Products",
          panel: (
            <div style={{ display: "flex", gap: "16px", padding: "8px" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>Components</div>
                <div style={{ fontSize: "12px", color: "var(--neu-text-secondary)" }}>61 clay-style components</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>Templates</div>
                <div style={{ fontSize: "12px", color: "var(--neu-text-secondary)" }}>Ready-to-use layouts</div>
              </div>
            </div>
          ),
        },
        {
          label: "Resources",
          panel: (
            <div style={{ padding: "8px", fontSize: "13px" }}>
              <p style={{ fontWeight: 700, marginBottom: "4px" }}>Documentation, tutorials, and guides.</p>
            </div>
          ),
        },
      ]}
    />
  );
}

function SpeedDialDemo() {
  return (
    <div style={{ height: "200px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <SpeedDial
        actions={[
          { label: "Copy", icon: <span>C</span>, onClick: () => {} },
          { label: "Edit", icon: <span>E</span>, onClick: () => {} },
          { label: "Share", icon: <span>S</span>, onClick: () => {} },
        ]}
      />
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Confirm Action" description="Are you sure you want to continue?">
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button variant="raised" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
}

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="raised">Open Popover</Button>}
    >
      <div style={{ fontSize: "13px", fontWeight: 600, maxWidth: "200px" }}>
        <p style={{ fontWeight: 800, marginBottom: "4px" }}>Popover Title</p>
        <p style={{ color: "var(--neu-text-secondary)" }}>This is some helpful popover content.</p>
      </div>
    </Popover>
  );
}

function TooltipDemo() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Tooltip content="Top tooltip" side="top">
        <Button variant="raised" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="raised" size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="raised" size="sm">Bottom</Button>
      </Tooltip>
    </div>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu
      trigger={<Button variant="raised">Open Menu</Button>}
      items={[
        { label: "Edit", icon: <span>E</span> },
        { label: "Duplicate", icon: <span>D</span> },
        { type: "separator" },
        { label: "Delete", danger: true, icon: <span>X</span> },
      ]}
    />
  );
}

function ContextMenuDemo() {
  return (
    <ContextMenu
      trigger={
        <div
          style={{
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "var(--neu-shadow-inset)",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--neu-text-secondary)",
          }}
        >
          Right-click here
        </div>
      }
      items={[
        { label: "Copy" },
        { label: "Paste" },
        { separator: true },
        { label: "Delete", danger: true },
      ]}
    />
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} title="Settings" side="right">
        <div style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>
          <p>Drawer content goes here. Slide-in panel from the side.</p>
        </div>
      </Drawer>
    </>
  );
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete Item</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this item?"
        description="This action cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}

function AlertDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <Alert variant="info" title="Info">This is an informational alert.</Alert>
      <Alert variant="success" title="Success">Operation completed successfully.</Alert>
      <Alert variant="warning" title="Warning">Please check your input.</Alert>
      <Alert variant="danger" title="Error">Something went wrong.</Alert>
    </div>
  );
}

function ToastDemoInner() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Button variant="raised" onClick={() => toast({ message: "Default toast", duration: 3000 })}>
        Default
      </Button>
      <Button variant="primary" onClick={() => toast({ message: "Saved!", variant: "success", duration: 3000 })}>
        Success
      </Button>
      <Button variant="danger" onClick={() => toast({ message: "Error occurred", variant: "danger", duration: 3000 })}>
        Danger
      </Button>
    </div>
  );
}

function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoInner />
    </ToastProvider>
  );
}

function AnnouncementBarDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <AnnouncementBar dismissible>
        NeumorUI v0.1.0 is here! Check out the new components.
      </AnnouncementBar>
      <AnnouncementBar variant="gradient" icon={<span>*</span>}>
        Special offer: 50% off Pro plan.
      </AnnouncementBar>
    </div>
  );
}

function CookieConsentDemo() {
  return (
    <CookieConsent
      title="Cookie Preferences"
      description="We use cookies to enhance your experience."
      options={[
        { label: "Essential", required: true, defaultChecked: true },
        { label: "Analytics", defaultChecked: false },
        { label: "Marketing", defaultChecked: false },
      ]}
      onAccept={(selected) => console.log("Accepted:", selected)}
    />
  );
}

function LoadingOverlayDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ maxWidth: "300px" }}>
      <Button variant="primary" size="sm" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>
        Toggle Loading
      </Button>
      <div style={{ marginTop: "12px" }}>
        <LoadingOverlay loading={loading} message="Processing...">
          <Card variant="raised" padding="md">
            <p style={{ fontSize: "13px" }}>Content behind the overlay.</p>
          </Card>
        </LoadingOverlay>
      </div>
    </div>
  );
}

function StepperDemo() {
  return (
    <Stepper
      steps={[
        { label: "Account", description: "Create account", status: "done" },
        { label: "Profile", description: "Setup profile", status: "active" },
        { label: "Review", description: "Confirm details", status: "pending" },
      ]}
    />
  );
}

function AccordionDemo() {
  return (
    <div style={{ maxWidth: "400px" }}>
      <Accordion
        items={[
          { value: "item-1", title: "What is NeumorUI?", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>A neumorphic component library for React with 61 clay-style components.</p> },
          { value: "item-2", title: "How to install?", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Run npm install neumorui and import the components you need.</p> },
          { value: "item-3", title: "Is it accessible?", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Yes! Built on Radix UI primitives for full keyboard and screen reader support.</p> },
        ]}
      />
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div style={{ maxWidth: "320px" }}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    </div>
  );
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div style={{ maxWidth: "300px" }}>
      <DatePicker label="Start date" value={date} onChange={setDate} placeholder="Pick a date" />
    </div>
  );
}

function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="raised" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        placeholder="Type a command..."
        items={[
          { value: "new-file", label: "New File", group: "Actions", shortcut: "N" },
          { value: "open", label: "Open Project", group: "Actions", shortcut: "O" },
          { value: "settings", label: "Settings", group: "Navigation" },
          { value: "theme", label: "Toggle Theme", group: "Navigation" },
        ]}
      />
    </>
  );
}

function ComboboxDemo() {
  const [val, setVal] = useState("");
  return (
    <div style={{ maxWidth: "300px" }}>
      <Combobox
        label="Country"
        placeholder="Select country..."
        value={val}
        onValueChange={setVal}
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
          { value: "jp", label: "Japan" },
        ]}
      />
    </div>
  );
}

function RevealDemo() {
  return (
    <Reveal>
      <Card variant="raised" padding="md">
        <p style={{ fontSize: "14px", fontWeight: 700 }}>This content reveals on scroll</p>
        <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", marginTop: "4px" }}>
          Uses IntersectionObserver to animate in when visible.
        </p>
      </Card>
    </Reveal>
  );
}

function MarqueeDemo() {
  return (
    <Marquee speed={20} pauseOnHover>
      {["React", "TypeScript", "Tailwind", "Radix UI", "Neumorphism", "NeumorUI"].map((text) => (
        <MarqueeItem key={text}>
          <Badge variant="primary" style={{ margin: "0 8px" }}>{text}</Badge>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}

function CarouselDemo() {
  return (
    <div style={{ maxWidth: "500px" }}>
      <Carousel
        autoPlay
        interval={5000}
        showProgress
        pauseOnHover
        slideHeight={200}
        slides={[
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px", color: "#fff" }}>Slide 1</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Drag or swipe to navigate</p>
              </div>
            ),
          },
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px", color: "#fff" }}>Slide 2</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Use arrow keys too</p>
              </div>
            ),
            background: "linear-gradient(135deg, var(--neu-success-light), var(--neu-success-dark))",
          },
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px", color: "#fff" }}>Slide 3</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Hover to pause autoplay</p>
              </div>
            ),
            background: "linear-gradient(135deg, var(--neu-danger-light), var(--neu-danger-dark))",
          },
        ]}
      />
    </div>
  );
}

/* ─── New component demos ─── */

function OTPInputDemo() {
  const [otp, setOtp] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <OTPInput
        length={6}
        value={otp}
        onChange={setOtp}
        onComplete={() => {}}
        label="Enter verification code"
        autoFocus
      />
      <p style={{ fontSize: "12px", color: "var(--neu-text-muted)" }}>
        {otp.length > 0 ? `Entered: ${otp}` : "Type or paste your code"}
      </p>
    </div>
  );
}

function ImageGalleryDemo() {
  return (
    <ImageGallery
      columns={3}
      gap={12}
      images={[
        { src: "https://picsum.photos/seed/neu1/300/300", alt: "Sample 1", caption: "Mountain landscape" },
        { src: "https://picsum.photos/seed/neu2/300/300", alt: "Sample 2", caption: "Ocean view" },
        { src: "https://picsum.photos/seed/neu3/300/300", alt: "Sample 3" },
        { src: "https://picsum.photos/seed/neu4/300/300", alt: "Sample 4", caption: "City lights" },
        { src: "https://picsum.photos/seed/neu5/300/300", alt: "Sample 5" },
        { src: "https://picsum.photos/seed/neu6/300/300", alt: "Sample 6" },
      ]}
    />
  );
}

function CountdownDemo() {
  const target = new Date();
  target.setHours(target.getHours() + 2);
  target.setMinutes(target.getMinutes() + 30);
  return <Countdown targetDate={target} />;
}

function SegmentedControlDemo() {
  const [view, setView] = useState("list");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { value: "list", label: "List" },
          { value: "grid", label: "Grid" },
          { value: "board", label: "Board" },
        ]}
      />
      <SegmentedControl
        defaultValue="monthly"
        size="lg"
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
      />
    </div>
  );
}

function ColorPickerDemo() {
  const [color, setColor] = useState("#6c7ef8");
  return <ColorPicker value={color} onChange={setColor} label="Pick a color" />;
}

function ChipDemo() {
  const [items, setItems] = useState(["React", "Vue", "Angular", "Svelte"]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      <Chip>Default</Chip>
      <Chip color="primary" variant="filled">Filled</Chip>
      <Chip color="success" variant="outlined">Outlined</Chip>
      <Chip color="danger" icon={<span>🔥</span>}>With icon</Chip>
      <Chip selected>Selected</Chip>
      {items.map((item) => (
        <Chip key={item} removable onRemove={() => setItems((p) => p.filter((i) => i !== item))}>
          {item}
        </Chip>
      ))}
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <EmptyState
      title="No projects yet"
      description="Create your first project to get started with NeumorUI."
      action={<Button variant="primary">Create project</Button>}
    />
  );
}

function BackToTopDemo() {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>
        Scroll down to see the button appear in the bottom-right corner.
      </p>
      <BackToTop threshold={100} />
    </div>
  );
}

function TagInputDemo() {
  const [tags, setTags] = useState(["React", "TypeScript"]);
  return (
    <TagInput
      value={tags}
      onChange={setTags}
      label="Technologies"
      placeholder="Add a tag..."
      maxTags={8}
      helperText="Press Enter or comma to add. Backspace to remove."
    />
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"bottom" | "right">("bottom");
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Button variant="raised" onClick={() => { setSide("bottom"); setOpen(true); }}>Bottom Sheet</Button>
      <Button variant="pill" onClick={() => { setSide("right"); setOpen(true); }}>Right Sheet</Button>
      <Sheet open={open} onOpenChange={setOpen} side={side} title="Sheet Title" description="Swipe down to dismiss">
        <p style={{ fontSize: "14px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>
          This is a mobile-friendly sheet component. Drag the handle to dismiss, or tap the backdrop.
        </p>
      </Sheet>
    </div>
  );
}

function TimelineDemo() {
  return (
    <Timeline
      items={[
        { title: "Project started", description: "Initial commit and setup", date: "Jan 2025", color: "var(--neu-accent)" },
        { title: "Beta release", description: "First public beta with 30 components", date: "Mar 2025", color: "var(--neu-success)" },
        { title: "v1.0 launch", description: "Stable release with 61+ components", date: "Apr 2025", color: "var(--neu-danger)" },
      ]}
    />
  );
}

function RatingDemo() {
  const [star, setStar] = useState(3);
  const [heart, setHeart] = useState(2);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <Rating value={star} onChange={setStar} label="Stars" />
      <Rating value={heart} onChange={setHeart} icon="heart" label="Hearts" />
      <Rating value={4} readOnly label="Read only" size="sm" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT DOCS REGISTRY
   ───────────────────────────────────────────────────────────────────────────── */

export const componentDocs: ComponentDoc[] = [
  /* ═══ FORM ═══ */
  {
    slug: "button",
    name: "Button",
    category: "Form",
    description: "Clay-style button with 8 variants and 3 sizes. Supports loading state, icons, and ripple effect.",
    preview: <ButtonDemo />,
    code: `import { Button } from "neumorui";

function App() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="raised">Raised</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  );
}`,
    props: [
      { name: "variant", type: '"raised" | "flat" | "inset" | "pill" | "icon" | "primary" | "danger" | "success"', default: '"raised"' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "loading", type: "boolean", default: "false" },
      { name: "leftIcon", type: "ReactNode", default: "-" },
      { name: "rightIcon", type: "ReactNode", default: "-" },
      { name: "ripple", type: "boolean", default: "false" },
    ],
    component: Button as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "Click me", variant: "raised", size: "md" },
  },
  {
    slug: "input",
    name: "Input",
    category: "Form",
    description: "Neumorphic text input with inset shadow, label, helper text, error state, and icon slots.",
    preview: <InputDemo />,
    code: `import { Input } from "neumorui";

function App() {
  const [val, setVal] = useState("");
  return (
    <Input
      label="Name"
      placeholder="Enter your name"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
}`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "leftIcon", type: "ReactNode", default: "-" },
      { name: "rightIcon", type: "ReactNode", default: "-" },
    ],
    component: Input as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Email", placeholder: "you@example.com" },
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Form",
    description: "Multi-line clay text area with label, helper text, error, and resize control.",
    preview: <TextareaDemo />,
    code: `import { Textarea } from "neumorui";

<Textarea
  label="Message"
  placeholder="Write something..."
  helperText="Max 500 characters"
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "resize", type: '"none" | "both" | "horizontal" | "vertical"', default: '"vertical"' },
      { name: "rows", type: "number", default: "4" },
    ],
    component: Textarea as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Message", placeholder: "Type here..." },
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Form",
    description: "Toggle switch built on Radix with clay styling, label, and description.",
    preview: <SwitchDemo />,
    code: `import { Switch } from "neumorui";

function App() {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label="Dark mode"
      description="Toggle the theme"
      checked={on}
      onCheckedChange={setOn}
    />
  );
}`,
    props: [
      { name: "checked", type: "boolean", default: "-" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Switch as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Toggle me" },
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Form",
    description: "Neumorphic checkbox built on Radix with indeterminate state support.",
    preview: <CheckboxDemo />,
    code: `import { Checkbox } from "neumorui";

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept terms"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}`,
    props: [
      { name: "checked", type: 'boolean | "indeterminate"', default: "-" },
      { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Checkbox as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Check me" },
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    category: "Form",
    description: "Radio button group built on Radix with clay-style indicator and optional descriptions.",
    preview: <RadioGroupDemo />,
    code: `import { RadioGroup } from "neumorui";

function App() {
  const [val, setVal] = useState("option1");
  return (
    <RadioGroup
      label="Choose a plan"
      value={val}
      onValueChange={setVal}
      options={[
        { value: "option1", label: "Free", description: "Basic features" },
        { value: "option2", label: "Pro", description: "All features" },
      ]}
    />
  );
}`,
    props: [
      { name: "options", type: "RadioOption[]", default: "[]" },
      { name: "value", type: "string", default: "-" },
      { name: "onValueChange", type: "(value: string) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"' },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: RadioGroup as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Choose", options: [{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }] },
  },
  {
    slug: "select",
    name: "Select",
    category: "Form",
    description: "Dropdown select built on Radix with clay styling and option groups.",
    preview: <SelectDemo />,
    code: `import { Select } from "neumorui";

function App() {
  const [val, setVal] = useState("");
  return (
    <Select
      label="Framework"
      placeholder="Choose one..."
      value={val}
      onValueChange={setVal}
      options={[
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
      ]}
    />
  );
}`,
    props: [
      { name: "options", type: "SelectOption[]", default: "[]" },
      { name: "value", type: "string", default: "-" },
      { name: "onValueChange", type: "(value: string) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Select..."' },
      { name: "label", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Select as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Framework", placeholder: "Choose one...", options: [{ value: "react", label: "React" }, { value: "vue", label: "Vue" }] },
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Form",
    description: "Range slider built on Radix with clay track, thumb, and optional label/value display.",
    preview: <SliderDemo />,
    code: `import { Slider } from "neumorui";

function App() {
  const [val, setVal] = useState([50]);
  return (
    <Slider
      label="Volume"
      value={val}
      onValueChange={setVal}
      min={0}
      max={100}
    />
  );
}`,
    props: [
      { name: "value", type: "number[]", default: "-" },
      { name: "defaultValue", type: "number[]", default: "[50]" },
      { name: "onValueChange", type: "(value: number[]) => void", default: "-" },
      { name: "min", type: "number", default: "0" },
      { name: "max", type: "number", default: "100" },
      { name: "step", type: "number", default: "1" },
      { name: "label", type: "string", default: "-" },
      { name: "showValue", type: "boolean", default: "true" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Slider as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Volume", defaultValue: [50] },
  },
  {
    slug: "toggle-group",
    name: "ToggleGroup",
    category: "Form",
    description: "Single or multi-select toggle group built on Radix with clay pill styling.",
    preview: <ToggleGroupDemo />,
    code: `import { ToggleGroup } from "neumorui";

function App() {
  const [val, setVal] = useState("center");
  return (
    <ToggleGroup
      type="single"
      value={val}
      onValueChange={setVal}
      options={[
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ]}
    />
  );
}`,
    props: [
      { name: "type", type: '"single" | "multiple"', default: "-" },
      { name: "options", type: "ToggleOption[]", default: "[]" },
      { name: "value", type: "string | string[]", default: "-" },
      { name: "onValueChange", type: "(value: string | string[]) => void", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: ToggleGroup as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { type: "single", options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }] },
  },
  {
    slug: "file-upload",
    name: "FileUpload",
    category: "Form",
    description: "Drag-and-drop file upload zone with preview, progress, and validation.",
    preview: <FileUploadDemo />,
    code: `import { FileUpload } from "neumorui";

<FileUpload
  label="Upload files"
  hint="PNG, JPG up to 5MB"
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024}
/>`,
    props: [
      { name: "value", type: "UploadedFile[]", default: "-" },
      { name: "onChange", type: "(files: UploadedFile[]) => void", default: "-" },
      { name: "multiple", type: "boolean", default: "false" },
      { name: "accept", type: "string", default: "-" },
      { name: "maxSize", type: "number", default: "-" },
      { name: "maxFiles", type: "number", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "hint", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: FileUpload as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Upload files", hint: "PNG, JPG up to 5MB" },
  },

  /* ═══ LAYOUT ═══ */
  {
    slug: "card",
    name: "Card",
    category: "Layout",
    description: "Versatile container with raised, inset, and flat variants. Hover lift animation on raised variant.",
    preview: <CardDemo />,
    code: `import { Card } from "neumorui";

<Card variant="raised" padding="md">
  <h3>Title</h3>
  <p>Card content goes here.</p>
</Card>`,
    props: [
      { name: "variant", type: '"raised" | "inset" | "flat"', default: '"raised"' },
      { name: "padding", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
    component: Card as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "Card content", variant: "raised", padding: "md" },
  },
  {
    slug: "grid",
    name: "Grid",
    category: "Layout",
    description: "CSS Grid wrapper with responsive column control and auto-fit support.",
    preview: <GridDemo />,
    code: `import { Grid } from "neumorui";

<Grid cols={3} gap={24}>
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</Grid>`,
    props: [
      { name: "cols", type: "number | { sm?: number; md?: number; lg?: number; xl?: number }", default: "12" },
      { name: "gap", type: "number | string", default: "16" },
      { name: "rowGap", type: "number | string", default: "-" },
      { name: "colGap", type: "number | string", default: "-" },
      { name: "minChildWidth", type: "string", default: "-" },
    ],
    component: Grid as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { cols: 3, gap: 16 },
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Layout",
    description: "Horizontal or vertical divider with optional label. Inset shadow styling.",
    preview: <DividerDemo />,
    code: `import { Divider } from "neumorui";

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' },
      { name: "label", type: "string", default: "-" },
      { name: "variant", type: '"solid" | "inset"', default: '"inset"' },
    ],
    component: Divider as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: {},
  },
  {
    slug: "hero",
    name: "Hero",
    category: "Layout",
    description: "Full-width hero section with gradient background, eyebrow text, title, subtitle, and action buttons.",
    preview: <HeroDemo />,
    code: `import { Hero, Button } from "neumorui";

<Hero
  eyebrow="Introducing NeumorUI"
  title="Beautiful clay-style components"
  subtitle="Build stunning neumorphic interfaces"
  actions={
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <Button variant="primary">Get started</Button>
      <Button variant="raised">Learn more</Button>
    </div>
  }
/>`,
    props: [
      { name: "eyebrow", type: "string", default: "-" },
      { name: "title", type: "ReactNode", default: "-" },
      { name: "subtitle", type: "string", default: "-" },
      { name: "actions", type: "ReactNode", default: "-" },
      { name: "backgroundGradient", type: "string", default: '"linear-gradient(...)"' },
    ],
    component: Hero as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: "Welcome", subtitle: "Build something amazing" },
  },
  {
    slug: "pricing-card",
    name: "PricingCard",
    category: "Layout",
    description: "Pricing comparison cards with feature lists, highlighting, and CTA buttons.",
    preview: <PricingCardDemo />,
    code: `import { PricingCard } from "neumorui";

<PricingCard
  plans={[
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      features: [
        { label: "5 projects", included: true },
        { label: "API access", included: false },
      ],
      cta: { label: "Start free" },
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      highlighted: true,
      badge: "Popular",
      features: [
        { label: "Unlimited projects", included: true },
        { label: "API access", included: true },
      ],
      cta: { label: "Upgrade", variant: "primary" },
    },
  ]}
/>`,
    props: [
      { name: "plans", type: "PricingPlan[]", default: "[]" },
      { name: "onCtaClick", type: "(planName: string) => void", default: "-" },
    ],
    component: PricingCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { plans: [{ name: "Free", price: "$0", period: "/mo", features: [{ label: "5 projects", included: true }], cta: { label: "Start" } }, { name: "Pro", price: "$19", period: "/mo", features: [{ label: "Unlimited", included: true }], cta: { label: "Upgrade" } }] },
  },
  {
    slug: "col",
    name: "Col",
    category: "Layout",
    description: "Grid column component for controlling span, start and end positions within a Grid.",
    preview: <ColDemo />,
    code: `import { Grid, Col } from "neumorui";

<Grid cols={12} gap={24}>
  <Col span={4}><div>span=4</div></Col>
  <Col span={8}><div>span=8</div></Col>
</Grid>`,
    props: [
      { name: "span", type: "number", default: "-" },
      { name: "start", type: "number", default: "-" },
      { name: "end", type: "number", default: "-" },
    ],
    component: Col as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { span: 6, children: "Column content" },
  },

  /* ═══ DATA DISPLAY ═══ */
  {
    slug: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Small status indicator with 6 color variants and optional dot indicator.",
    preview: <BadgeDemo />,
    code: `import { Badge } from "neumorui";

<Badge variant="primary">Primary</Badge>
<Badge variant="success" dot>Active</Badge>`,
    props: [
      { name: "variant", type: '"default" | "primary" | "success" | "danger" | "warning" | "info"', default: '"default"' },
      { name: "dot", type: "boolean", default: "false" },
    ],
    component: Badge as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "Badge", variant: "primary" },
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "User avatar with initials fallback, image support, and online status indicator.",
    preview: <AvatarDemo />,
    code: `import { Avatar } from "neumorui";

<Avatar initials="JD" size="md" status="online" />
<Avatar src="/photo.jpg" alt="User" size="lg" />`,
    props: [
      { name: "src", type: "string", default: "-" },
      { name: "alt", type: "string", default: "-" },
      { name: "initials", type: "string", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"' },
      { name: "status", type: '"online" | "offline" | "busy" | "away"', default: "-" },
    ],
    component: Avatar as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { initials: "JD", size: "md" },
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Data Display",
    description: "Animated progress bar with gradient fill, label, and 4 color variants.",
    preview: <ProgressDemo />,
    code: `import { Progress } from "neumorui";

<Progress value={65} label="Upload" showLabel />
<Progress value={80} variant="success" showLabel />`,
    props: [
      { name: "value", type: "number", default: "-" },
      { name: "max", type: "number", default: "100" },
      { name: "variant", type: '"default" | "success" | "danger" | "warning"', default: '"default"' },
      { name: "showLabel", type: "boolean", default: "false" },
      { name: "label", type: "string", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: Progress as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { value: 65, showLabel: true },
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Data Display",
    description: "Shimmer loading placeholder with text, avatar, card, and rect variants.",
    preview: <SkeletonDemo />,
    code: `import { Skeleton } from "neumorui";

<Skeleton variant="avatar" />
<Skeleton variant="text" lines={3} />
<Skeleton variant="rect" height={80} />`,
    props: [
      { name: "variant", type: '"text" | "avatar" | "card" | "rect"', default: '"rect"' },
      { name: "width", type: "string | number", default: "-" },
      { name: "height", type: "string | number", default: "-" },
      { name: "lines", type: "number", default: "3" },
    ],
    component: Skeleton as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { variant: "text" },
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Data Display",
    description: "Animated loading spinner with 4 sizes and color variants.",
    preview: <SpinnerDemo />,
    code: `import { Spinner } from "neumorui";

<Spinner size="md" />
<Spinner size="lg" variant="success" label="Loading..." />`,
    props: [
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"' },
      { name: "variant", type: '"default" | "primary" | "success" | "danger"', default: '"default"' },
      { name: "label", type: "string", default: "-" },
    ],
    component: Spinner as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { size: "md" },
  },
  {
    slug: "data-table",
    name: "DataTable",
    category: "Data Display",
    description: "Feature-rich data table powered by TanStack Table with sorting and pagination.",
    preview: <DataTableDemo />,
    code: `import { DataTable } from "neumorui";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const data = [
  { name: "Alice", role: "Engineer", status: "Active" },
  { name: "Bob", role: "Designer", status: "Active" },
];

<DataTable columns={columns} data={data} pageSize={5} />`,
    props: [
      { name: "columns", type: "ColumnDef[]", default: "-" },
      { name: "data", type: "TData[]", default: "-" },
      { name: "loading", type: "boolean", default: "false" },
      { name: "empty", type: "ReactNode", default: "-" },
      { name: "pageSize", type: "number", default: "10" },
      { name: "showPagination", type: "boolean", default: "true" },
      { name: "onRowClick", type: "(row: TData) => void", default: "-" },
    ],
    component: DataTable as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { columns: [{ accessorKey: "name", header: "Name" }, { accessorKey: "role", header: "Role" }], data: [{ name: "Alice", role: "Engineer" }, { name: "Bob", role: "Designer" }] },
  },
  {
    slug: "stats-card",
    name: "StatsCard",
    category: "Data Display",
    description: "Metric display card with trend indicator, label, value, and description.",
    preview: <StatsCardDemo />,
    code: `import { StatsCard } from "neumorui";

<StatsCard
  label="Revenue"
  value="$12,340"
  trend={{ value: "+12%", direction: "up" }}
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "value", type: "string | number", default: "-" },
      { name: "trend", type: '{ value: string; direction: "up" | "down" }', default: "-" },
      { name: "color", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "animate", type: "boolean", default: "true" },
      { name: "duration", type: "number", default: "1200" },
    ],
    component: StatsCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Revenue", value: "$12,340", trend: { value: "+12%", direction: "up" } },
  },
  {
    slug: "bar-chart",
    name: "BarChart",
    category: "Data Display",
    description: "Animated bar chart with hover tooltips and gradient fills.",
    preview: <BarChartDemo />,
    code: `import { BarChart } from "neumorui";

<BarChart
  title="Weekly Sales"
  data={[
    { label: "Mon", value: 40 },
    { label: "Tue", value: 65 },
    { label: "Wed", value: 50 },
  ]}
/>`,
    props: [
      { name: "data", type: "BarChartDataItem[]", default: "[]" },
      { name: "height", type: "number", default: "120" },
      { name: "title", type: "string", default: "-" },
      { name: "trend", type: "ReactNode", default: "-" },
    ],
    component: BarChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: [{ label: "A", value: 30 }, { label: "B", value: 60 }, { label: "C", value: 45 }] },
  },
  {
    slug: "donut-chart",
    name: "DonutChart",
    category: "Data Display",
    description: "SVG donut/pie chart with animated segments and center label.",
    preview: <DonutChartDemo />,
    code: `import { DonutChart } from "neumorui";

<DonutChart
  segments={[
    { label: "React", value: 45, color: "#6c7ef8" },
    { label: "Vue", value: 25, color: "#4dbfa0" },
    { label: "Svelte", value: 20, color: "#e8a84b" },
  ]}
  centerLabel="Total"
  centerValue="100%"
/>`,
    props: [
      { name: "segments", type: "DonutSegment[]", default: "[]" },
      { name: "size", type: "number", default: "120" },
      { name: "strokeWidth", type: "number", default: "18" },
      { name: "centerLabel", type: "string", default: "-" },
      { name: "centerValue", type: "string", default: "-" },
    ],
    component: DonutChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { segments: [{ label: "React", value: 45, color: "#6c7ef8" }, { label: "Vue", value: 25, color: "#4dbfa0" }, { label: "Svelte", value: 20, color: "#e8a84b" }] },
  },
  {
    slug: "line-chart",
    name: "LineChart",
    category: "Data Display",
    description: "SVG line chart with animated path, dots, and gradient fill area.",
    preview: <LineChartDemo />,
    code: `import { LineChart } from "neumorui";

<LineChart
  data={[
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 38 },
    { label: "Apr", value: 65 },
  ]}
/>`,
    props: [
      { name: "data", type: "LineChartDataItem[]", default: "[]" },
      { name: "height", type: "number", default: "140" },
      { name: "color", type: "string", default: '"#6c7ef8"' },
      { name: "showDots", type: "boolean", default: "true" },
      { name: "showFill", type: "boolean", default: "true" },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: LineChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: [{ label: "Mon", value: 30 }, { label: "Tue", value: 50 }, { label: "Wed", value: 40 }] },
  },
  {
    slug: "heatmap",
    name: "Heatmap",
    category: "Data Display",
    description: "GitHub-style contribution heatmap grid with configurable colors.",
    preview: <HeatmapDemo />,
    code: `import { Heatmap } from "neumorui";

const data = Array.from({ length: 91 }, () => Math.random());

<Heatmap data={data} cols={13} rows={7} />`,
    props: [
      { name: "data", type: "number[][] | number[]", default: "[]" },
      { name: "cols", type: "number", default: "13" },
      { name: "rows", type: "number", default: "7" },
      { name: "colors", type: "string", default: '"108, 126, 248"' },
    ],
    component: Heatmap as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: Array.from({ length: 91 }, () => Math.random()), cols: 13, rows: 7 },
  },
  {
    slug: "comparison-table",
    name: "ComparisonTable",
    category: "Data Display",
    description: "Feature comparison table for pricing or product pages with highlight support.",
    preview: <ComparisonTableDemo />,
    code: `import { ComparisonTable } from "neumorui";

<ComparisonTable
  features={["Storage", "Users", "Support"]}
  plans={[
    { name: "Free", values: ["1 GB", "1", false] },
    { name: "Pro", highlight: true, values: ["50 GB", "10", true] },
  ]}
/>`,
    props: [
      { name: "features", type: "string[]", default: "[]" },
      { name: "plans", type: "ComparisonPlan[]", default: "[]" },
    ],
    component: ComparisonTable as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { features: ["Storage", "Users", "Support"], plans: [{ name: "Free", values: ["1 GB", "1", false] }, { name: "Pro", highlight: true, values: ["50 GB", "10", true] }] },
  },
  {
    slug: "kanban-board",
    name: "KanbanBoard",
    category: "Data Display",
    description: "Kanban board layout with columns, cards, tags, assignees, and progress bars.",
    preview: <KanbanBoardDemo />,
    code: `import { KanbanBoard } from "neumorui";

<KanbanBoard
  columns={[
    {
      id: "todo",
      title: "To Do",
      items: [
        { id: "1", title: "Design homepage", tag: { label: "Design", variant: "blue" } },
      ],
    },
    {
      id: "done",
      title: "Done",
      items: [
        { id: "2", title: "Setup project" },
      ],
    },
  ]}
/>`,
    props: [
      { name: "columns", type: "KanbanColumn[]", default: "[]" },
    ],
    component: KanbanBoard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { columns: [{ id: "todo", title: "To Do", items: [{ id: "1", title: "Task 1" }] }, { id: "done", title: "Done", items: [{ id: "2", title: "Task 2" }] }] },
  },
  {
    slug: "tree-view",
    name: "TreeView",
    category: "Data Display",
    description: "Expandable/collapsible tree view for hierarchical data with icons.",
    preview: <TreeViewDemo />,
    code: `import { TreeView } from "neumorui";

<TreeView
  nodes={[
    {
      label: "src",
      children: [
        { label: "components", children: [{ label: "Button.tsx" }] },
        { label: "index.ts" },
      ],
    },
    { label: "package.json" },
  ]}
/>`,
    props: [
      { name: "nodes", type: "TreeNode[]", default: "[]" },
    ],
    component: TreeView as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { nodes: [{ label: "src", children: [{ label: "index.ts" }, { label: "App.tsx" }] }, { label: "package.json" }] },
  },
  {
    slug: "activity-feed",
    name: "ActivityFeed",
    category: "Data Display",
    description: "Timeline-style activity feed with colored indicators and timestamps.",
    preview: <ActivityFeedDemo />,
    code: `import { ActivityFeed } from "neumorui";

<ActivityFeed
  items={[
    { user: "Alice", action: "pushed 3 commits", time: "2 min ago", color: "#6c7ef8" },
    { user: "Bob", action: "opened PR #42", time: "15 min ago", color: "#4dbfa0" },
  ]}
/>`,
    props: [
      { name: "items", type: "ActivityItem[]", default: "[]" },
      { name: "onLoadMore", type: "() => void", default: "-" },
    ],
    component: ActivityFeed as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ user: "Alice", action: "pushed 3 commits", time: "2 min ago", color: "#6c7ef8" }, { user: "Bob", action: "opened PR #42", time: "15 min ago", color: "#4dbfa0" }] },
  },

  /* ═══ NAVIGATION ═══ */
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Tab navigation built on Radix with pill and underline variants.",
    preview: <TabsDemo />,
    code: `import { Tabs } from "neumorui";

<Tabs
  tabs={[
    { value: "preview", label: "Preview", content: <div>Preview</div> },
    { value: "code", label: "Code", content: <div>Code</div> },
  ]}
/>`,
    props: [
      { name: "tabs", type: "Tab[]", default: "[]" },
      { name: "defaultValue", type: "string", default: "-" },
      { name: "variant", type: '"pill" | "underline"', default: '"pill"' },
    ],
    component: Tabs as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { tabs: [{ value: "1", label: "Tab 1", content: "Content 1" }, { value: "2", label: "Tab 2", content: "Content 2" }] },
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Breadcrumb navigation with clay chip styling and custom separator.",
    preview: <BreadcrumbDemo />,
    code: `import { Breadcrumb } from "neumorui";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/docs" },
    { label: "Breadcrumb" },
  ]}
/>`,
    props: [
      { name: "items", type: "BreadcrumbItem[]", default: "[]" },
      { name: "separator", type: "ReactNode", default: '">"' },
    ],
    component: Breadcrumb as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ label: "Home", href: "#" }, { label: "Docs", href: "#" }, { label: "Breadcrumb" }] },
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page navigation with sibling ellipsis, multiple sizes, and clay styling.",
    preview: <PaginationDemo />,
    code: `import { Pagination } from "neumorui";

function App() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} total={10} onChange={setPage} />;
}`,
    props: [
      { name: "page", type: "number", default: "-" },
      { name: "total", type: "number", default: "-" },
      { name: "onChange", type: "(page: number) => void", default: "-" },
      { name: "siblings", type: "number", default: "1" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
    component: Pagination as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { page: 1, total: 10 },
  },
  {
    slug: "navbar",
    name: "Navbar",
    category: "Navigation",
    description: "Responsive navigation bar with logo, links, and action area.",
    preview: <NavbarDemo />,
    code: `import { Navbar, Button } from "neumorui";

<Navbar
  brand="NeumorUI"
  links={[
    { label: "Home", href: "/", active: true },
    { label: "Docs", href: "/docs" },
  ]}
  actions={<Button variant="primary" size="sm">Sign in</Button>}
/>`,
    props: [
      { name: "logo", type: "ReactNode", default: "-" },
      { name: "brand", type: "string", default: "-" },
      { name: "links", type: "NavLink[]", default: "[]" },
      { name: "actions", type: "ReactNode", default: "-" },
    ],
  },
  {
    slug: "sidebar-nav",
    name: "Sidebar",
    category: "Navigation",
    description: "Vertical sidebar navigation with groups, icons, badges, and active indicator.",
    preview: <SidebarNavDemo />,
    code: `import { Sidebar } from "neumorui";

<Sidebar
  brand="Dashboard"
  items={[
    { label: "Overview", icon: <span>O</span>, active: true },
    { label: "Analytics", icon: <span>A</span>, badge: "3" },
    { label: "Settings", icon: <span>S</span>, group: "System" },
  ]}
/>`,
    props: [
      { name: "items", type: "SidebarItem[]", default: "[]" },
      { name: "logo", type: "ReactNode", default: "-" },
      { name: "brand", type: "string", default: "-" },
    ],
  },
  {
    slug: "bottom-nav",
    name: "BottomNav",
    category: "Navigation",
    description: "Mobile bottom navigation bar with icons, badges, and create button.",
    preview: <BottomNavDemo />,
    code: `import { BottomNav } from "neumorui";

function App() {
  const [active, setActive] = useState(0);
  return (
    <BottomNav
      activeIndex={active}
      onActiveChange={setActive}
      items={[
        { label: "Home", icon: <span>H</span> },
        { label: "Search", icon: <span>S</span> },
        { label: "Add", icon: <span>+</span>, isCreate: true },
        { label: "Profile", icon: <span>P</span> },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "BottomNavItem[]", default: "[]" },
      { name: "activeIndex", type: "number", default: "-" },
      { name: "onActiveChange", type: "(index: number) => void", default: "-" },
    ],
  },
  {
    slug: "browser-tabs",
    name: "BrowserTabs",
    category: "Navigation",
    description: "Browser-style tab bar with close buttons, add button, and badge support.",
    preview: <BrowserTabsDemo />,
    code: `import { BrowserTabs } from "neumorui";

function App() {
  const [active, setActive] = useState("tab1");
  const [tabs, setTabs] = useState([
    { id: "tab1", label: "index.tsx", closable: true },
    { id: "tab2", label: "styles.css", closable: true },
  ]);
  return (
    <BrowserTabs
      tabs={tabs}
      activeTab={active}
      onTabChange={setActive}
      onTabClose={(id) => setTabs(tabs.filter(t => t.id !== id))}
    />
  );
}`,
    props: [
      { name: "tabs", type: "BrowserTab[]", default: "[]" },
      { name: "activeTab", type: "string", default: "-" },
      { name: "onTabChange", type: "(id: string) => void", default: "-" },
      { name: "onTabClose", type: "(id: string) => void", default: "-" },
      { name: "onTabAdd", type: "() => void", default: "-" },
    ],
  },
  {
    slug: "mega-menu",
    name: "MegaMenu",
    category: "Navigation",
    description: "Dropdown mega menu with custom panel content for each menu item.",
    preview: <MegaMenuDemo />,
    code: `import { MegaMenu } from "neumorui";

<MegaMenu
  items={[
    {
      label: "Products",
      panel: (
        <div style={{ display: "flex", gap: 16, padding: 8 }}>
          <div>
            <strong>Components</strong>
            <p>61 clay-style components</p>
          </div>
        </div>
      ),
    },
  ]}
/>`,
    props: [
      { name: "items", type: "MegaMenuItem[]", default: "[]" },
    ],
  },
  {
    slug: "speed-dial",
    name: "SpeedDial",
    category: "Navigation",
    description: "Floating action button that reveals a set of actions on click.",
    preview: <SpeedDialDemo />,
    code: `import { SpeedDial } from "neumorui";

<SpeedDial
  actions={[
    { label: "Copy", icon: <span>C</span>, onClick: () => {} },
    { label: "Edit", icon: <span>E</span>, onClick: () => {} },
    { label: "Share", icon: <span>S</span>, onClick: () => {} },
  ]}
/>`,
    props: [
      { name: "actions", type: "SpeedDialAction[]", default: "[]" },
      { name: "icon", type: "ReactNode", default: '"+"' },
    ],
    component: SpeedDial as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { actions: [{ label: "Copy", icon: "C", onClick: () => {} }, { label: "Edit", icon: "E", onClick: () => {} }] },
  },

  /* ═══ OVERLAY ═══ */
  {
    slug: "modal",
    name: "Modal",
    category: "Overlay",
    description: "Radix-based dialog with backdrop blur, 3 sizes, and clay styling.",
    preview: <ModalDemo />,
    code: `import { Modal, Button } from "neumorui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Confirm Action">
        <p>Are you sure?</p>
        <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
      </Modal>
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "trigger", type: "ReactNode", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlay",
    description: "Radix-based popover with configurable side, alignment, and clay shadow.",
    preview: <PopoverDemo />,
    code: `import { Popover, Button } from "neumorui";

<Popover trigger={<Button>Open Popover</Button>}>
  <p>Popover content here.</p>
</Popover>`,
    props: [
      { name: "trigger", type: "ReactNode", default: "-" },
      { name: "children", type: "ReactNode", default: "-" },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
      { name: "align", type: '"start" | "center" | "end"', default: '"center"' },
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    description: "Radix tooltip with clay styling, configurable side and delay.",
    preview: <TooltipDemo />,
    code: `import { Tooltip, Button } from "neumorui";

<Tooltip content="Helpful tip" side="top">
  <Button>Hover me</Button>
</Tooltip>`,
    props: [
      { name: "content", type: "ReactNode", default: "-" },
      { name: "children", type: "ReactNode", default: "-" },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"' },
      { name: "delayDuration", type: "number", default: "300" },
    ],
  },
  {
    slug: "dropdown-menu",
    name: "DropdownMenu",
    category: "Overlay",
    description: "Radix dropdown menu with items, separators, labels, shortcuts, and danger items.",
    preview: <DropdownMenuDemo />,
    code: `import { DropdownMenu, Button } from "neumorui";

<DropdownMenu
  trigger={<Button>Open Menu</Button>}
  items={[
    { label: "Edit" },
    { label: "Duplicate" },
    { type: "separator" },
    { label: "Delete", danger: true },
  ]}
/>`,
    props: [
      { name: "trigger", type: "ReactNode", default: "-" },
      { name: "items", type: "DropdownEntry[]", default: "[]" },
      { name: "align", type: '"start" | "center" | "end"', default: '"start"' },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
    ],
  },
  {
    slug: "context-menu",
    name: "ContextMenu",
    category: "Overlay",
    description: "Right-click context menu with clay styling, icons, and separators.",
    preview: <ContextMenuDemo />,
    code: `import { ContextMenu } from "neumorui";

<ContextMenu
  trigger={<div>Right-click here</div>}
  items={[
    { label: "Copy" },
    { label: "Paste" },
    { separator: true },
    { label: "Delete", danger: true },
  ]}
/>`,
    props: [
      { name: "trigger", type: "ReactNode", default: "-" },
      { name: "items", type: "ContextMenuItem[]", default: "[]" },
    ],
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlay",
    description: "Slide-in panel from left, right, or bottom with backdrop blur.",
    preview: <DrawerDemo />,
    code: `import { Drawer, Button } from "neumorui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} title="Settings" side="right">
        <p>Drawer content here.</p>
      </Drawer>
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "side", type: '"left" | "right" | "bottom"', default: '"right"' },
      { name: "title", type: "string", default: "-" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
  },
  {
    slug: "confirm-dialog",
    name: "ConfirmDialog",
    category: "Overlay",
    description: "Confirmation dialog with danger variant, optional text input matching, and icon.",
    preview: <ConfirmDialogDemo />,
    code: `import { ConfirmDialog, Button } from "neumorui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Delete</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this item?"
        description="This action cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "variant", type: '"default" | "danger"', default: '"default"' },
      { name: "confirmLabel", type: "string", default: '"Confirm"' },
      { name: "cancelLabel", type: "string", default: '"Cancel"' },
      { name: "onConfirm", type: "() => void", default: "-" },
      { name: "onCancel", type: "() => void", default: "-" },
      { name: "input", type: "{ placeholder?: string; matchValue?: string }", default: "-" },
    ],
  },

  /* ═══ FEEDBACK ═══ */
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Dismissible alert banner with 4 variants, icon, and title.",
    preview: <AlertDemo />,
    code: `import { Alert } from "neumorui";

<Alert variant="info" title="Info">
  This is an informational alert.
</Alert>
<Alert variant="success" title="Success">
  Operation completed successfully.
</Alert>`,
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"' },
      { name: "title", type: "string", default: "-" },
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "onClose", type: "() => void", default: "-" },
    ],
    component: Alert as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "This is an alert", variant: "info" },
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Toast notification system with ToastProvider and useToast hook. 4 variants with auto-dismiss.",
    preview: <ToastDemo />,
    code: `import { ToastProvider, useToast, Button } from "neumorui";

function Inner() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ message: "Saved!", variant: "success" })}>
      Show toast
    </Button>
  );
}

function App() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}`,
    props: [
      { name: "message", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "variant", type: '"default" | "success" | "danger" | "warning"', default: '"default"' },
      { name: "duration", type: "number", default: "4000" },
    ],
  },
  {
    slug: "announcement-bar",
    name: "AnnouncementBar",
    category: "Feedback",
    description: "Dismissible banner with clay or gradient styling for announcements.",
    preview: <AnnouncementBarDemo />,
    code: `import { AnnouncementBar } from "neumorui";

<AnnouncementBar dismissible>
  NeumorUI v0.1.0 is here!
</AnnouncementBar>
<AnnouncementBar variant="gradient">
  Special offer!
</AnnouncementBar>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "variant", type: '"gradient" | "clay"', default: '"clay"' },
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "dismissible", type: "boolean", default: "false" },
      { name: "onDismiss", type: "() => void", default: "-" },
    ],
    component: AnnouncementBar as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "NeumorUI v1.0 is here!", dismissible: true },
  },
  {
    slug: "cookie-consent",
    name: "CookieConsent",
    category: "Feedback",
    description: "GDPR cookie consent banner with toggleable category options.",
    preview: <CookieConsentDemo />,
    code: `import { CookieConsent } from "neumorui";

<CookieConsent
  options={[
    { label: "Essential", required: true, defaultChecked: true },
    { label: "Analytics", defaultChecked: false },
    { label: "Marketing", defaultChecked: false },
  ]}
  onAccept={(selected) => console.log(selected)}
/>`,
    props: [
      { name: "title", type: "string", default: '"Cookie Preferences"' },
      { name: "description", type: "string", default: '"We use cookies..."' },
      { name: "privacyLink", type: "string", default: "-" },
      { name: "options", type: "CookieOption[]", default: "[]" },
      { name: "onAccept", type: "(selected: string[]) => void", default: "-" },
      { name: "onCustomize", type: "(selected: string[]) => void", default: "-" },
    ],
    component: CookieConsent as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: "Cookie Preferences", description: "We use cookies to enhance your experience.", options: [{ label: "Essential", required: true, defaultChecked: true }, { label: "Analytics", defaultChecked: false }] },
  },
  {
    slug: "loading-overlay",
    name: "LoadingOverlay",
    category: "Feedback",
    description: "Semi-transparent overlay with spinner over content while loading.",
    preview: <LoadingOverlayDemo />,
    code: `import { LoadingOverlay, Card } from "neumorui";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingOverlay loading={loading} message="Processing...">
      <Card>Content here</Card>
    </LoadingOverlay>
  );
}`,
    props: [
      { name: "loading", type: "boolean", default: "-" },
      { name: "message", type: "string", default: "-" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Feedback",
    description: "Multi-step progress indicator with done, active, and pending states.",
    preview: <StepperDemo />,
    code: `import { Stepper } from "neumorui";

<Stepper
  steps={[
    { label: "Account", description: "Create account", status: "done" },
    { label: "Profile", description: "Setup profile", status: "active" },
    { label: "Review", description: "Confirm details", status: "pending" },
  ]}
/>`,
    props: [
      { name: "steps", type: "Step[]", default: "[]" },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"horizontal"' },
    ],
    component: Stepper as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { steps: [{ label: "Step 1", status: "done" }, { label: "Step 2", status: "active" }, { label: "Step 3", status: "pending" }] },
  },

  /* ═══ DISCLOSURE ═══ */
  {
    slug: "accordion",
    name: "Accordion",
    category: "Disclosure",
    description: "Radix-based accordion with single or multiple expand modes and clay styling.",
    preview: <AccordionDemo />,
    code: `import { Accordion } from "neumorui";

<Accordion
  items={[
    { value: "q1", title: "What is NeumorUI?", content: <p>A neumorphic library.</p> },
    { value: "q2", title: "How to install?", content: <p>npm install neumorui</p> },
  ]}
/>`,
    props: [
      { name: "items", type: "AccordionItem[]", default: "[]" },
      { name: "type", type: '"single" | "multiple"', default: '"single"' },
      { name: "defaultValue", type: "string | string[]", default: "-" },
      { name: "collapsible", type: "boolean", default: "true" },
    ],
    component: Accordion as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ value: "1", title: "Section 1", content: "Content 1" }, { value: "2", title: "Section 2", content: "Content 2" }] },
  },

  /* ═══ DATE ═══ */
  {
    slug: "calendar",
    name: "Calendar",
    category: "Date",
    description: "Date calendar built on react-day-picker with clay styling.",
    preview: <CalendarDemo />,
    code: `import { Calendar } from "neumorui";

function App() {
  const [date, setDate] = useState(new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}`,
    props: [
      { name: "mode", type: '"single" | "multiple" | "range"', default: '"single"' },
      { name: "selected", type: "Date | Date[] | DateRange", default: "-" },
      { name: "onSelect", type: "(date: Date) => void", default: "-" },
    ],
    component: Calendar as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { mode: "single" },
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    category: "Date",
    description: "Input + popover date picker with format control and min/max dates.",
    preview: <DatePickerDemo />,
    code: `import { DatePicker } from "neumorui";

function App() {
  const [date, setDate] = useState<Date | undefined>();
  return <DatePicker label="Start date" value={date} onChange={setDate} />;
}`,
    props: [
      { name: "value", type: "Date", default: "-" },
      { name: "onChange", type: "(date: Date | undefined) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "placeholder", type: "string", default: '"Pick a date"' },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "dateFormat", type: "string", default: '"PP"' },
      { name: "minDate", type: "Date", default: "-" },
      { name: "maxDate", type: "Date", default: "-" },
    ],
    component: DatePicker as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Date", placeholder: "Pick a date" },
  },

  /* ═══ COMMAND ═══ */
  {
    slug: "command",
    name: "Command",
    category: "Command",
    description: "Command palette (Cmd+K) built on cmdk with groups, shortcuts, and fuzzy search.",
    preview: <CommandDemo />,
    code: `import { Command, Button } from "neumorui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Command</Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        placeholder="Type a command..."
        items={[
          { value: "new", label: "New File", group: "Actions", shortcut: "N" },
          { value: "settings", label: "Settings", group: "Navigation" },
        ]}
      />
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "items", type: "CommandItem[]", default: "[]" },
      { name: "placeholder", type: "string", default: "-" },
      { name: "emptyMessage", type: "string", default: "-" },
      { name: "title", type: "string", default: "-" },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Command",
    description: "Searchable dropdown combobox built on cmdk + Radix popover.",
    preview: <ComboboxDemo />,
    code: `import { Combobox } from "neumorui";

function App() {
  const [val, setVal] = useState("");
  return (
    <Combobox
      label="Country"
      placeholder="Select..."
      value={val}
      onValueChange={setVal}
      options={[
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
      ]}
    />
  );
}`,
    props: [
      { name: "options", type: "ComboboxOption[]", default: "[]" },
      { name: "value", type: "string", default: "-" },
      { name: "onValueChange", type: "(value: string) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "placeholder", type: "string", default: "-" },
      { name: "searchPlaceholder", type: "string", default: "-" },
      { name: "emptyMessage", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Combobox as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Country", placeholder: "Select...", options: [{ value: "us", label: "United States" }, { value: "uk", label: "United Kingdom" }] },
  },

  /* ═══ ANIMATION ═══ */
  {
    slug: "reveal",
    name: "Reveal",
    category: "Animation",
    description: "Scroll-triggered reveal animation using IntersectionObserver.",
    preview: <RevealDemo />,
    code: `import { Reveal, Card } from "neumorui";

<Reveal delay={100}>
  <Card>This reveals on scroll</Card>
</Reveal>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "delay", type: "number", default: "0" },
    ],
  },
  {
    slug: "marquee",
    name: "Marquee",
    category: "Animation",
    description: "Infinite horizontal scrolling marquee with configurable speed and direction.",
    preview: <MarqueeDemo />,
    code: `import { Marquee, MarqueeItem, Badge } from "neumorui";

<Marquee speed={20} pauseOnHover>
  {["React", "TypeScript", "Tailwind"].map((t) => (
    <MarqueeItem key={t}>
      <Badge variant="primary">{t}</Badge>
    </MarqueeItem>
  ))}
</Marquee>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "speed", type: "number", default: "15" },
      { name: "direction", type: '"left" | "right"', default: '"left"' },
      { name: "pauseOnHover", type: "boolean", default: "false" },
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "Animation",
    description: "Slide carousel with drag/swipe, keyboard nav, autoplay with progress bar, and dot indicators.",
    preview: <CarouselDemo />,
    code: `import { Carousel } from "neumorui";

<Carousel
  autoPlay
  interval={4000}
  pauseOnHover
  showProgress
  slideHeight={200}
  slides={[
    { content: <div>Slide 1</div> },
    { content: <div>Slide 2</div> },
    { content: <div>Slide 3</div> },
  ]}
/>`,
    props: [
      { name: "slides", type: "CarouselSlide[]", default: "[]" },
      { name: "autoPlay", type: "boolean", default: "false" },
      { name: "interval", type: "number", default: "4000" },
      { name: "pauseOnHover", type: "boolean", default: "true" },
      { name: "loop", type: "boolean", default: "true" },
      { name: "showArrows", type: "boolean", default: "true" },
      { name: "showDots", type: "boolean", default: "true" },
      { name: "showProgress", type: "boolean", default: "false" },
      { name: "slideHeight", type: "number | string", default: "200" },
    ],
  },
  // ─── New components ───
  {
    slug: "otp-input",
    name: "OTPInput",
    category: "Form",
    description: "One-time password input with auto-focus, masking, and paste support.",
    preview: <OTPInputDemo />,
    code: `import { OTPInput } from "neumorui";

function App() {
  const [otp, setOtp] = useState("");
  return (
    <OTPInput
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={(code) => console.log("OTP:", code)}
      label="Verification code"
    />
  );
}`,
    props: [
      { name: "length", type: "number", default: "6" },
      { name: "value", type: "string", default: '""' },
      { name: "onChange", type: "(value: string) => void", default: "-" },
      { name: "onComplete", type: "(value: string) => void", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "error", type: "boolean", default: "false" },
      { name: "masked", type: "boolean", default: "false" },
      { name: "autoFocus", type: "boolean", default: "false" },
      { name: "label", type: "string", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
    component: OTPInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { length: 6, label: "Verification code" },
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Form",
    description: "Star or heart rating selector with hover preview, half-star support, and read-only mode.",
    preview: <RatingDemo />,
    code: `import { Rating } from "neumorui";

function App() {
  const [value, setValue] = useState(3);
  return (
    <Rating
      value={value}
      onChange={setValue}
      max={5}
      icon="star"
      label="Your rating"
    />
  );
}`,
    props: [
      { name: "value", type: "number", default: "-" },
      { name: "defaultValue", type: "number", default: "0" },
      { name: "onChange", type: "(value: number) => void", default: "-" },
      { name: "max", type: "number", default: "5" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "icon", type: '"star" | "heart"', default: '"star"' },
      { name: "readOnly", type: "boolean", default: "false" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "allowHalf", type: "boolean", default: "false" },
      { name: "label", type: "string", default: "-" },
    ],
    component: Rating as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { defaultValue: 3 },
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data Display",
    description: "Vertical or horizontal event timeline with neumorphic nodes, connector lines, and hover animations.",
    preview: <TimelineDemo />,
    code: `import { Timeline } from "neumorui";

<Timeline
  items={[
    { title: "Step 1", description: "Details", date: "Jan 2025" },
    { title: "Step 2", description: "Details", date: "Mar 2025" },
    { title: "Step 3", description: "Details", date: "Apr 2025" },
  ]}
  orientation="vertical"
  alternating={false}
/>`,
    props: [
      { name: "items", type: "TimelineItem[]", default: "[]" },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"' },
      { name: "alternating", type: "boolean", default: "false" },
    ],
    component: Timeline as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ title: "Event 1", description: "First event", date: "Jan 2025" }, { title: "Event 2", description: "Second event", date: "Mar 2025" }] },
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlay",
    description: "Mobile-friendly bottom/side sheet with drag-to-dismiss, backdrop blur, and neumorphic handle.",
    preview: <SheetDemo />,
    code: `import { Sheet, Button } from "neumorui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        title="Sheet Title"
        description="Drag down to dismiss"
      >
        <p>Sheet content here</p>
      </Sheet>
    </>
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "children", type: "ReactNode", default: "-" },
      { name: "side", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"' },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "showHandle", type: "boolean", default: "true" },
    ],
  },
  {
    slug: "tag-input",
    name: "TagInput",
    category: "Form",
    description: "Multi-tag input with Enter/comma to add, Backspace to remove, paste support, and max limit.",
    preview: <TagInputDemo />,
    code: `import { TagInput } from "neumorui";

function App() {
  const [tags, setTags] = useState(["React", "TypeScript"]);
  return (
    <TagInput
      value={tags}
      onChange={setTags}
      label="Skills"
      placeholder="Add a tag..."
      maxTags={10}
    />
  );
}`,
    props: [
      { name: "value", type: "string[]", default: "-" },
      { name: "defaultValue", type: "string[]", default: "[]" },
      { name: "onChange", type: "(tags: string[]) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "placeholder", type: "string", default: '"Type and press Enter..."' },
      { name: "maxTags", type: "number", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "error", type: "boolean", default: "false" },
      { name: "helperText", type: "string", default: "-" },
    ],
    component: TagInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Tags", placeholder: "Add a tag..." },
  },
  {
    slug: "back-to-top",
    name: "BackToTop",
    category: "Navigation",
    description: "Floating scroll-to-top button with scroll threshold, smooth scroll, and neumorphic hover/press states.",
    preview: <BackToTopDemo />,
    code: `import { BackToTop } from "neumorui";

<BackToTop
  threshold={300}
  smooth
  position="bottom-right"
  size="md"
/>`,
    props: [
      { name: "threshold", type: "number", default: "300" },
      { name: "smooth", type: "boolean", default: "true" },
      { name: "icon", type: "ReactNode", default: "arrow up" },
      { name: "position", type: '"bottom-right" | "bottom-left" | "bottom-center"', default: '"bottom-right"' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
  },
  {
    slug: "empty-state",
    name: "EmptyState",
    category: "Feedback",
    description: "Placeholder for empty pages with icon, title, description, and call-to-action button.",
    preview: <EmptyStateDemo />,
    code: `import { EmptyState, Button } from "neumorui";

<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  action={<Button variant="primary">Create project</Button>}
/>`,
    props: [
      { name: "icon", type: "ReactNode", default: "folder icon" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "action", type: "ReactNode", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
    component: EmptyState as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: "No data", description: "Nothing to show here" },
  },
  {
    slug: "chip",
    name: "Chip",
    category: "Data Display",
    description: "Removable and selectable chip/tag with raised, outlined, and filled variants.",
    preview: <ChipDemo />,
    code: `import { Chip } from "neumorui";

<Chip variant="raised" removable onRemove={() => {}}>React</Chip>
<Chip variant="filled" color="primary">Primary</Chip>
<Chip variant="outlined" color="success">Success</Chip>
<Chip selected onClick={() => {}}>Selectable</Chip>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "variant", type: '"raised" | "outlined" | "filled"', default: '"raised"' },
      { name: "color", type: '"default" | "primary" | "success" | "danger" | "warning"', default: '"default"' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "removable", type: "boolean", default: "false" },
      { name: "onRemove", type: "() => void", default: "-" },
      { name: "selected", type: "boolean", default: "false" },
      { name: "onClick", type: "() => void", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: Chip as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "Chip", variant: "raised" },
  },
  {
    slug: "color-picker",
    name: "ColorPicker",
    category: "Form",
    description: "Neumorphic color picker with preset swatches, hex input, native picker fallback, and live preview.",
    preview: <ColorPickerDemo />,
    code: `import { ColorPicker } from "neumorui";

function App() {
  const [color, setColor] = useState("#6c7ef8");
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Brand color"
      showInput
    />
  );
}`,
    props: [
      { name: "value", type: "string", default: "-" },
      { name: "defaultValue", type: "string", default: '"#6c7ef8"' },
      { name: "onChange", type: "(color: string) => void", default: "-" },
      { name: "presets", type: "string[]", default: "20 default colors" },
      { name: "label", type: "string", default: "-" },
      { name: "showInput", type: "boolean", default: "true" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: ColorPicker as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Color", defaultValue: "#6c7ef8" },
  },
  {
    slug: "image-gallery",
    name: "ImageGallery",
    category: "Data Display",
    description: "Responsive image grid with neumorphic hover effects, lightbox viewer, keyboard navigation, and captions.",
    preview: <ImageGalleryDemo />,
    code: `import { ImageGallery } from "neumorui";

<ImageGallery
  columns={3}
  gap={12}
  lightbox
  images={[
    { src: "/photo1.jpg", alt: "Photo 1", caption: "My caption" },
    { src: "/photo2.jpg", alt: "Photo 2" },
    { src: "/photo3.jpg", alt: "Photo 3" },
  ]}
/>`,
    props: [
      { name: "images", type: "GalleryImage[]", default: "[]" },
      { name: "columns", type: "number", default: "3" },
      { name: "gap", type: "number", default: "12" },
      { name: "rounded", type: "number", default: "16" },
      { name: "lightbox", type: "boolean", default: "true" },
    ],
    component: ImageGallery as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { columns: 3, images: [{ src: "https://picsum.photos/seed/neu1/300/300", alt: "Sample 1" }, { src: "https://picsum.photos/seed/neu2/300/300", alt: "Sample 2" }, { src: "https://picsum.photos/seed/neu3/300/300", alt: "Sample 3" }] },
  },
  {
    slug: "countdown",
    name: "Countdown",
    category: "Data Display",
    description: "Live countdown timer with flip animation, blinking separators, and customizable units.",
    preview: <CountdownDemo />,
    code: `import { Countdown } from "neumorui";

const target = new Date("2025-12-31T00:00:00");

<Countdown
  targetDate={target}
  onComplete={() => alert("Done!")}
  size="md"
  variant="raised"
/>`,
    props: [
      { name: "targetDate", type: "Date | string | number", default: "-" },
      { name: "onComplete", type: "() => void", default: "-" },
      { name: "showDays", type: "boolean", default: "true" },
      { name: "showHours", type: "boolean", default: "true" },
      { name: "showMinutes", type: "boolean", default: "true" },
      { name: "showSeconds", type: "boolean", default: "true" },
      { name: "labels", type: "{ days?: string; hours?: string; minutes?: string; seconds?: string }", default: "Days/Hours/Min/Sec" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "variant", type: '"raised" | "inset"', default: '"raised"' },
    ],
    component: Countdown as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { targetDate: new Date(Date.now() + 3600000) },
  },
  {
    slug: "segmented-control",
    name: "SegmentedControl",
    category: "Form",
    description: "iOS-style segmented toggle with sliding neumorphic indicator, icon support, and fullWidth mode.",
    preview: <SegmentedControlDemo />,
    code: `import { SegmentedControl } from "neumorui";

function App() {
  const [view, setView] = useState("list");
  return (
    <SegmentedControl
      value={view}
      onChange={setView}
      options={[
        { value: "list", label: "List" },
        { value: "grid", label: "Grid" },
        { value: "board", label: "Board" },
      ]}
    />
  );
}`,
    props: [
      { name: "options", type: "SegmentOption[]", default: "[]" },
      { name: "value", type: "string", default: "-" },
      { name: "defaultValue", type: "string", default: "first option" },
      { name: "onChange", type: "(value: string) => void", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "fullWidth", type: "boolean", default: "false" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: SegmentedControl as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { options: [{ value: "list", label: "List" }, { value: "grid", label: "Grid" }] },
  },

  // ── PasswordInput ──
  {
    slug: "password-input",
    name: "PasswordInput",
    category: "Form",
    description: "Password input with eye toggle visibility, strength meter bar, and neumorphic inset styling.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "340px" }}>
        <PasswordInput label="Password" placeholder="Enter password" showStrength />
        <PasswordInput label="Confirm Password" placeholder="Re-enter password" />
      </div>
    ),
    code: `import { PasswordInput } from "neumorui";

<PasswordInput
  label="Password"
  placeholder="Enter password"
  showStrength
/>

<PasswordInput
  label="Confirm Password"
  placeholder="Re-enter password"
  error="Passwords do not match"
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "showStrength", type: "boolean", default: "false" },
      { name: "placeholder", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: PasswordInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Password", placeholder: "Enter password" },
  },

  // ── NumberInput ──
  {
    slug: "number-input",
    name: "NumberInput",
    category: "Form",
    description: "Numeric stepper input with neumorphic +/− buttons, min/max/step support, and mobile-friendly inputMode.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "240px" }}>
        <NumberInput label="Quantity" defaultValue={1} min={0} max={99} />
        <NumberInput label="Price" defaultValue={10} step={5} min={0} />
      </div>
    ),
    code: `import { NumberInput } from "neumorui";

<NumberInput
  label="Quantity"
  defaultValue={1}
  min={0}
  max={99}
/>

<NumberInput
  label="Price"
  defaultValue={10}
  step={5}
  min={0}
  onChange={(val) => console.log(val)}
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "value", type: "number", default: "-" },
      { name: "defaultValue", type: "number", default: "0" },
      { name: "onChange", type: "(value: number) => void", default: "-" },
      { name: "min", type: "number", default: "-Infinity" },
      { name: "max", type: "number", default: "Infinity" },
      { name: "step", type: "number", default: "1" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: NumberInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Quantity", defaultValue: 5 },
  },

  // ── PhoneInput ──
  {
    slug: "phone-input",
    name: "PhoneInput",
    category: "Form",
    description: "International phone input with country flag dropdown, dial code, search, and auto-format.",
    preview: (
      <div style={{ maxWidth: "360px" }}>
        <PhoneInput label="Phone Number" defaultCountry="BD" />
      </div>
    ),
    code: `import { PhoneInput } from "neumorui";

<PhoneInput
  label="Phone Number"
  defaultCountry="BD"
  onChange={(full, dial, phone) => {
    console.log(full, dial, phone);
  }}
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "value", type: "string", default: "-" },
      { name: "onChange", type: "(full, dial, phone) => void", default: "-" },
      { name: "defaultCountry", type: "string", default: '"BD"' },
      { name: "countries", type: "CountryCode[]", default: "20 preset countries" },
      { name: "placeholder", type: "string", default: '"1XX XXXX XXXX"' },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: PhoneInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Phone Number", defaultCountry: "BD" },
  },

  // ── PinInput ──
  {
    slug: "pin-input",
    name: "PinInput",
    category: "Form",
    description: "Individual digit PIN input with auto-focus advance, paste support, mask mode, and 3 sizes.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <PinInput label="Enter PIN" length={4} size="md" />
        <PinInput label="OTP (masked)" length={6} size="sm" mask />
      </div>
    ),
    code: `import { PinInput } from "neumorui";

<PinInput
  label="Enter PIN"
  length={4}
  onComplete={(pin) => console.log("PIN:", pin)}
/>

<PinInput
  label="OTP (masked)"
  length={6}
  mask
  size="sm"
/>`,
    props: [
      { name: "length", type: "number", default: "4" },
      { name: "label", type: "string", default: "-" },
      { name: "mask", type: "boolean", default: "false" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "onChange", type: "(value: string) => void", default: "-" },
      { name: "onComplete", type: "(value: string) => void", default: "-" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: PinInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "PIN", length: 4 },
  },

  // ── InputGroup ──
  {
    slug: "input-group",
    name: "InputGroup",
    category: "Form",
    description: "Input wrapper with left/right addons and inline elements for prefix, suffix, and icon slots.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "360px" }}>
        <InputGroup label="Website" leftAddon="https://" placeholder="example.com" />
        <InputGroup label="Email" rightAddon="@gmail.com" placeholder="username" />
        <InputGroup label="Price" leftAddon="$" rightAddon=".00" placeholder="0" />
      </div>
    ),
    code: `import { InputGroup } from "neumorui";

<InputGroup
  label="Website"
  leftAddon="https://"
  placeholder="example.com"
/>

<InputGroup
  label="Email"
  rightAddon="@gmail.com"
  placeholder="username"
/>

<InputGroup
  label="Price"
  leftAddon="$"
  rightAddon=".00"
  placeholder="0"
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "leftAddon", type: "ReactNode", default: "-" },
      { name: "rightAddon", type: "ReactNode", default: "-" },
      { name: "leftElement", type: "ReactNode", default: "-" },
      { name: "rightElement", type: "ReactNode", default: "-" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "placeholder", type: "string", default: "-" },
    ],
    component: InputGroup as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Website", leftAddon: "https://", placeholder: "example.com" },
  },

  // ── FormField ──
  {
    slug: "form-field",
    name: "FormField",
    category: "Form",
    description: "Consistent form layout wrapper with label, error, helper text, required indicator, and horizontal mode.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "360px" }}>
        <FormField label="Email" required helperText="We'll never share your email.">
          <Input placeholder="you@example.com" />
        </FormField>
        <FormField label="Name" error="Name is required" required>
          <Input placeholder="John Doe" />
        </FormField>
        <FormField label="Bio" horizontal>
          <Input placeholder="Tell us about yourself" />
        </FormField>
      </div>
    ),
    code: `import { FormField, Input } from "neumorui";

<FormField label="Email" required helperText="We'll never share your email.">
  <Input placeholder="you@example.com" />
</FormField>

<FormField label="Name" error="Name is required" required>
  <Input placeholder="John Doe" />
</FormField>

{/* Horizontal layout */}
<FormField label="Bio" horizontal>
  <Input placeholder="Tell us about yourself" />
</FormField>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "htmlFor", type: "string", default: "auto from label" },
      { name: "helperText", type: "string", default: "-" },
      { name: "error", type: "string", default: "-" },
      { name: "required", type: "boolean", default: "false" },
      { name: "horizontal", type: "boolean", default: "false" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: FormField as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Email", required: true, helperText: "We'll never share your email." },
  },

  // ── AreaChart ──
  {
    slug: "area-chart",
    name: "AreaChart",
    category: "Data Display",
    description: "Gradient-filled area chart with smooth bezier curves, grid lines, dots, and animated draw.",
    preview: (
      <AreaChart
        data={[
          { label: "Mon", value: 30 },
          { label: "Tue", value: 58 },
          { label: "Wed", value: 42 },
          { label: "Thu", value: 75 },
          { label: "Fri", value: 62 },
          { label: "Sat", value: 88 },
          { label: "Sun", value: 70 },
        ]}
        height={160}
        showValues
      />
    ),
    code: `import { AreaChart } from "neumorui";

<AreaChart
  data={[
    { label: "Mon", value: 30 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 42 },
    { label: "Thu", value: 75 },
    { label: "Fri", value: 62 },
    { label: "Sat", value: 88 },
    { label: "Sun", value: 70 },
  ]}
  height={160}
  showValues
/>`,
    props: [
      { name: "data", type: "AreaChartDataItem[]", default: "[]" },
      { name: "height", type: "number", default: "160" },
      { name: "color", type: "string", default: '"#6c7ef8"' },
      { name: "gradientOpacity", type: "number", default: "0.35" },
      { name: "showDots", type: "boolean", default: "true" },
      { name: "showGrid", type: "boolean", default: "true" },
      { name: "showLabels", type: "boolean", default: "true" },
      { name: "showValues", type: "boolean", default: "false" },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: AreaChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: [{ label: "Mon", value: 30 }, { label: "Tue", value: 50 }, { label: "Wed", value: 40 }], height: 160 },
  },

  // ── RadarChart ──
  {
    slug: "radar-chart",
    name: "RadarChart",
    category: "Data Display",
    description: "Spider/radar chart for multi-axis comparison with animated fill, labels, and configurable rings.",
    preview: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RadarChart
          data={[
            { label: "Speed", value: 85 },
            { label: "Power", value: 70 },
            { label: "Defense", value: 60 },
            { label: "Agility", value: 90 },
            { label: "Stamina", value: 75 },
          ]}
          size={220}
          showValues
        />
      </div>
    ),
    code: `import { RadarChart } from "neumorui";

<RadarChart
  data={[
    { label: "Speed", value: 85 },
    { label: "Power", value: 70 },
    { label: "Defense", value: 60 },
    { label: "Agility", value: 90 },
    { label: "Stamina", value: 75 },
  ]}
  size={220}
  showValues
/>`,
    props: [
      { name: "data", type: "RadarChartDataItem[]", default: "[]" },
      { name: "size", type: "number", default: "240" },
      { name: "color", type: "string", default: '"#6c7ef8"' },
      { name: "maxValue", type: "number", default: "100" },
      { name: "showLabels", type: "boolean", default: "true" },
      { name: "showValues", type: "boolean", default: "false" },
      { name: "rings", type: "number", default: "4" },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: RadarChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: [{ label: "Speed", value: 85 }, { label: "Power", value: 70 }, { label: "Defense", value: 60 }, { label: "Agility", value: 90 }], size: 220 },
  },

  // ── GaugeChart ──
  {
    slug: "gauge-chart",
    name: "GaugeChart",
    category: "Data Display",
    description: "Circular gauge/speedometer with animated arc fill, auto-color based on value, and center label.",
    preview: (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <GaugeChart value={82} label="Score" size={140} />
        <GaugeChart value={45} label="CPU" suffix="%" size={140} />
        <GaugeChart value={28} max={100} label="Low" size={140} />
      </div>
    ),
    code: `import { GaugeChart } from "neumorui";

<GaugeChart value={82} label="Score" />
<GaugeChart value={45} label="CPU" suffix="%" />
<GaugeChart value={28} label="Low" />`,
    props: [
      { name: "value", type: "number", default: "-" },
      { name: "max", type: "number", default: "100" },
      { name: "size", type: "number", default: "160" },
      { name: "strokeWidth", type: "number", default: "14" },
      { name: "color", type: "string", default: "auto (green/yellow/red)" },
      { name: "label", type: "string", default: "-" },
      { name: "showValue", type: "boolean", default: "true" },
      { name: "suffix", type: "string", default: '""' },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: GaugeChart as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { value: 72, label: "Score" },
  },

  // ── Sparkline ──
  {
    slug: "sparkline",
    name: "Sparkline",
    category: "Data Display",
    description: "Tiny inline SVG chart for embedding in tables, stat cards, or inline text.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)", minWidth: "60px" }}>Revenue</span>
          <Sparkline data={[20, 35, 28, 50, 42, 65, 58, 72]} width={120} height={30} color="var(--neu-success)" />
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-success)" }}>+18%</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)", minWidth: "60px" }}>Users</span>
          <Sparkline data={[60, 55, 48, 52, 45, 38, 42, 35]} width={120} height={30} color="var(--neu-danger)" />
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-danger)" }}>-12%</span>
        </div>
      </div>
    ),
    code: `import { Sparkline } from "neumorui";

<Sparkline
  data={[20, 35, 28, 50, 42, 65, 58, 72]}
  width={120}
  height={30}
  color="var(--neu-success)"
/>`,
    props: [
      { name: "data", type: "number[]", default: "[]" },
      { name: "width", type: "number", default: "120" },
      { name: "height", type: "number", default: "32" },
      { name: "color", type: "string", default: '"#6c7ef8"' },
      { name: "showFill", type: "boolean", default: "true" },
      { name: "strokeWidth", type: "number", default: "1.5" },
      { name: "animate", type: "boolean", default: "true" },
    ],
    component: Sparkline as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { data: [20, 35, 28, 50, 42, 65, 58, 72] },
  },

  // ── UserCard ──
  {
    slug: "user-card",
    name: "UserCard",
    category: "Data Display",
    description: "Profile card with cover, avatar, name, role, bio, and social link buttons.",
    preview: (
      <div style={{ maxWidth: "280px" }}>
        <UserCard
          name="Jane Cooper"
          role="Product Designer"
          bio="Creating beautiful interfaces and delightful user experiences."
          avatar="https://i.pravatar.cc/150?img=5"
          socialLinks={[
            { icon: "🐦", href: "#", label: "Twitter" },
            { icon: "💼", href: "#", label: "LinkedIn" },
            { icon: "🐙", href: "#", label: "GitHub" },
          ]}
        />
      </div>
    ),
    code: `import { UserCard } from "neumorui";

<UserCard
  name="Jane Cooper"
  role="Product Designer"
  bio="Creating beautiful interfaces."
  avatar="https://i.pravatar.cc/150?img=5"
  socialLinks={[
    { icon: "🐦", href: "#", label: "Twitter" },
    { icon: "💼", href: "#", label: "LinkedIn" },
    { icon: "🐙", href: "#", label: "GitHub" },
  ]}
/>`,
    props: [
      { name: "name", type: "string", default: "-" },
      { name: "role", type: "string", default: "-" },
      { name: "avatar", type: "string", default: "-" },
      { name: "initials", type: "string", default: "auto from name" },
      { name: "bio", type: "string", default: "-" },
      { name: "socialLinks", type: "SocialLink[]", default: "[]" },
      { name: "coverColor", type: "string", default: "var(--neu-accent)" },
      { name: "onClick", type: "() => void", default: "-" },
    ],
    component: UserCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { name: "Jane Cooper", role: "Designer" },
  },

  // ── TestimonialCard ──
  {
    slug: "testimonial-card",
    name: "TestimonialCard",
    category: "Data Display",
    description: "Customer review card with quote, avatar, author name, role, and star rating.",
    preview: (
      <div style={{ maxWidth: "340px" }}>
        <TestimonialCard
          quote="NeumorUI made our app look premium without hiring a designer. The neumorphic style is beautiful and consistent."
          author="Sarah Chen"
          role="CTO, StartupXYZ"
          avatar="https://i.pravatar.cc/150?img=32"
          rating={5}
        />
      </div>
    ),
    code: `import { TestimonialCard } from "neumorui";

<TestimonialCard
  quote="NeumorUI made our app look premium without hiring a designer."
  author="Sarah Chen"
  role="CTO, StartupXYZ"
  avatar="https://i.pravatar.cc/150?img=32"
  rating={5}
/>`,
    props: [
      { name: "quote", type: "string", default: "-" },
      { name: "author", type: "string", default: "-" },
      { name: "role", type: "string", default: "-" },
      { name: "avatar", type: "string", default: "-" },
      { name: "rating", type: "number", default: "-" },
      { name: "maxRating", type: "number", default: "5" },
    ],
    component: TestimonialCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { quote: "Great library!", author: "Sarah", rating: 5 },
  },

  // ── NotificationCard ──
  {
    slug: "notification-card",
    name: "NotificationCard",
    category: "Data Display",
    description: "Notification list item with icon, title, description, timestamp, unread indicator, and dismiss.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <NotificationCard
          icon="📦"
          title="New order received"
          description="Order #1234 has been placed by John Doe."
          time="2 min ago"
          variant="success"
          unread
          onDismiss={() => {}}
        />
        <NotificationCard
          icon="⚠️"
          title="Server warning"
          description="CPU usage exceeded 90% threshold."
          time="15 min ago"
          variant="warning"
        />
        <NotificationCard
          icon="💬"
          title="New comment"
          description="Alex replied to your post."
          time="1 hour ago"
        />
      </div>
    ),
    code: `import { NotificationCard } from "neumorui";

<NotificationCard
  icon="📦"
  title="New order received"
  description="Order #1234 has been placed."
  time="2 min ago"
  variant="success"
  unread
  onDismiss={() => {}}
/>`,
    props: [
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "time", type: "string", default: "-" },
      { name: "variant", type: '"default" | "success" | "warning" | "danger" | "info"', default: '"default"' },
      { name: "unread", type: "boolean", default: "false" },
      { name: "action", type: "ReactNode", default: "-" },
      { name: "onDismiss", type: "() => void", default: "-" },
      { name: "onClick", type: "() => void", default: "-" },
    ],
    component: NotificationCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: "New message", description: "You have a new notification", time: "2m ago", icon: "📬" },
  },

  // ── CodeBlock ──
  {
    slug: "code-block",
    name: "CodeBlock",
    category: "Data Display",
    description: "Code display block with line numbers, language badge, copy button, and monospace styling.",
    preview: (
      <CodeBlock
        title="App.tsx"
        language="tsx"
        code={`import { Button, Card } from "neumorui";

export function App() {
  return (
    <Card variant="raised">
      <h1>Hello NeumorUI</h1>
      <Button variant="primary">
        Get Started
      </Button>
    </Card>
  );
}`}
      />
    ),
    code: `import { CodeBlock } from "neumorui";

<CodeBlock
  title="App.tsx"
  language="tsx"
  code={\`import { Button } from "neumorui";

<Button variant="primary">
  Click me
</Button>\`}
/>`,
    props: [
      { name: "code", type: "string", default: "-" },
      { name: "language", type: "string", default: '"tsx"' },
      { name: "title", type: "string", default: "-" },
      { name: "showLineNumbers", type: "boolean", default: "true" },
      { name: "showCopyButton", type: "boolean", default: "true" },
      { name: "maxHeight", type: "number", default: "-" },
    ],
    component: CodeBlock as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { code: "const x = 1;", title: "Example", language: "tsx" },
  },

  // ── AspectRatio ──
  {
    slug: "aspect-ratio",
    name: "AspectRatio",
    category: "Layout",
    description: "Fixed aspect ratio container for images, videos, and embeds. Supports any custom ratio.",
    preview: (
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ width: "200px", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--neu-shadow-raised)" }}>
          <AspectRatio ratio={16 / 9}>
            <img src="https://picsum.photos/seed/ar1/400/225" alt="16:9" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </AspectRatio>
        </div>
        <div style={{ width: "120px", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--neu-shadow-raised)" }}>
          <AspectRatio ratio={1}>
            <img src="https://picsum.photos/seed/ar2/200/200" alt="1:1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </AspectRatio>
        </div>
        <div style={{ width: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--neu-shadow-raised)" }}>
          <AspectRatio ratio={4 / 3}>
            <img src="https://picsum.photos/seed/ar3/400/300" alt="4:3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </AspectRatio>
        </div>
      </div>
    ),
    code: `import { AspectRatio } from "neumorui";

{/* 16:9 Video container */}
<AspectRatio ratio={16 / 9}>
  <img src="/photo.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</AspectRatio>

{/* Square */}
<AspectRatio ratio={1}>
  <img src="/avatar.jpg" ... />
</AspectRatio>`,
    props: [
      { name: "ratio", type: "number", default: "16/9" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: AspectRatio as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { ratio: 16 / 9 },
  },

  // ── ScrollArea ──
  {
    slug: "scroll-area",
    name: "ScrollArea",
    category: "Layout",
    description: "Custom neumorphic scrollbar with auto-hide, drag support, and smooth scrolling.",
    preview: (
      <div style={{ maxWidth: "320px" }}>
        <ScrollArea maxHeight={180}>
          <div style={{ padding: "16px" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-raised-sm)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--neu-text-primary)",
                }}
              >
                List item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
    code: `import { ScrollArea } from "neumorui";

<ScrollArea maxHeight={200}>
  <div style={{ padding: "16px" }}>
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</ScrollArea>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "maxHeight", type: "number | string", default: "300" },
      { name: "hideScrollbar", type: "boolean", default: "false" },
    ],
    component: ScrollArea as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { maxHeight: 200, children: "Scrollable content here" },
  },

  // ── ResizablePanels ──
  {
    slug: "resizable-panels",
    name: "ResizablePanels",
    category: "Layout",
    description: "Draggable split pane with horizontal/vertical direction, min/max constraints, and touch support.",
    preview: (
      <ResizablePanels defaultSize={40} minSize={25} maxSize={75} style={{ height: "180px" }}>
        <div style={{ padding: "16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>Panel A</span>
        </div>
        <div style={{ padding: "16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>Panel B</span>
        </div>
      </ResizablePanels>
    ),
    code: `import { ResizablePanels } from "neumorui";

<ResizablePanels defaultSize={40} minSize={25} maxSize={75}>
  <div>Panel A — sidebar</div>
  <div>Panel B — content</div>
</ResizablePanels>

{/* Vertical split */}
<ResizablePanels direction="vertical">
  <div>Top panel</div>
  <div>Bottom panel</div>
</ResizablePanels>`,
    props: [
      { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"' },
      { name: "defaultSize", type: "number", default: "50" },
      { name: "minSize", type: "number", default: "20" },
      { name: "maxSize", type: "number", default: "80" },
      { name: "children", type: "[ReactNode, ReactNode]", default: "-" },
    ],
    component: ResizablePanels as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { defaultSize: 50, minSize: 20, maxSize: 80 },
  },

  // ── Masonry ──
  {
    slug: "masonry",
    name: "Masonry",
    category: "Layout",
    description: "Pinterest-style masonry grid layout with responsive column count and gap control.",
    preview: (
      <Masonry columns={3} gap={10}>
        {[80, 120, 100, 140, 90, 110, 130, 95, 115].map((h, i) => (
          <div
            key={i}
            style={{
              height: `${h}px`,
              borderRadius: "14px",
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--neu-text-muted)",
            }}
          >
            {h}px
          </div>
        ))}
      </Masonry>
    ),
    code: `import { Masonry } from "neumorui";

<Masonry columns={3} gap={12}>
  <Card>Short</Card>
  <Card>Taller card with more content</Card>
  <Card>Medium</Card>
  {/* Items auto-distribute into columns */}
</Masonry>`,
    props: [
      { name: "columns", type: "number", default: "3" },
      { name: "gap", type: "number", default: "12" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: Masonry as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { columns: 3, gap: 12 },
  },

  // ── Container ──
  {
    slug: "container",
    name: "Container",
    category: "Layout",
    description: "Responsive max-width container with 5 size presets, auto-centering, and optional padding.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(["sm", "md", "lg", "xl"] as const).map((sz) => (
          <Container key={sz} size={sz} style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset-sm)", borderRadius: "12px", padding: "10px 16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>
              Container size=&quot;{sz}&quot;
            </span>
          </Container>
        ))}
      </div>
    ),
    code: `import { Container } from "neumorui";

<Container size="lg">
  <h1>Page content</h1>
  <p>Centered and responsive.</p>
</Container>

{/* Sizes: sm(640px), md(768px), lg(1024px), xl(1280px), full(100%) */}`,
    props: [
      { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"lg"' },
      { name: "centered", type: "boolean", default: "true" },
      { name: "padding", type: "boolean", default: "true" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: Container as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { size: "lg", children: "Container content" },
  },

  // ── Dock ──
  {
    slug: "dock",
    name: "Dock",
    category: "Navigation",
    description: "macOS-style dock bar with icon magnification on hover, tooltips, and badge support.",
    preview: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dock
          items={[
            { icon: "🏠", label: "Home" },
            { icon: "📁", label: "Files", badge: 3 },
            { icon: "💬", label: "Messages", badge: 12 },
            { icon: "📷", label: "Photos" },
            { icon: "🎵", label: "Music" },
            { icon: "⚙️", label: "Settings" },
          ]}
        />
      </div>
    ),
    code: `import { Dock } from "neumorui";

<Dock
  items={[
    { icon: "🏠", label: "Home", onClick: () => {} },
    { icon: "📁", label: "Files", badge: 3 },
    { icon: "💬", label: "Messages", badge: 12 },
    { icon: "⚙️", label: "Settings" },
  ]}
  magnification={1.6}
  baseSize={48}
/>`,
    props: [
      { name: "items", type: "DockItem[]", default: "[]" },
      { name: "position", type: '"bottom" | "top"', default: '"bottom"' },
      { name: "magnification", type: "number", default: "1.6" },
      { name: "baseSize", type: "number", default: "48" },
    ],
    component: Dock as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ icon: "🏠", label: "Home" }, { icon: "📁", label: "Files" }, { icon: "⚙️", label: "Settings" }] },
  },

  // ── Steps ──
  {
    slug: "steps",
    name: "Steps",
    category: "Navigation",
    description: "Multi-step wizard with done/active/pending states, horizontal and vertical layout, and 3 sizes.",
    preview: (
      <Steps
        current={1}
        steps={[
          { title: "Account", description: "Create your account" },
          { title: "Profile", description: "Set up your profile" },
          { title: "Review", description: "Review and submit" },
        ]}
      />
    ),
    code: `import { Steps } from "neumorui";

const [step, setStep] = useState(0);

<Steps
  current={step}
  onChange={setStep}
  steps={[
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Set up your profile" },
    { title: "Review", description: "Review and submit" },
  ]}
/>`,
    props: [
      { name: "steps", type: "StepItem[]", default: "[]" },
      { name: "current", type: "number", default: "-" },
      { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "onChange", type: "(step: number) => void", default: "-" },
    ],
    component: Steps as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { steps: [{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }], current: 0 },
  },

  // ── LinkPreview ──
  {
    slug: "link-preview",
    name: "LinkPreview",
    category: "Navigation",
    description: "Hover link preview card with image, title, description, favicon, and domain display.",
    preview: (
      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--neu-text-secondary)", lineHeight: 2 }}>
        Check out{" "}
        <LinkPreview
          href="https://github.com"
          title="GitHub: Let's build from here"
          description="GitHub is where over 100 million developers shape the future of software, together."
          image="https://picsum.photos/seed/github/400/200"
        >
          GitHub
        </LinkPreview>
        {" "}for open source projects.
      </div>
    ),
    code: `import { LinkPreview } from "neumorui";

<p>
  Check out{" "}
  <LinkPreview
    href="https://github.com"
    title="GitHub: Let's build from here"
    description="Where 100M+ developers build software."
    image="/github-preview.png"
  >
    GitHub
  </LinkPreview>
  {" "}for projects.
</p>`,
    props: [
      { name: "href", type: "string", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "image", type: "string", default: "-" },
      { name: "favicon", type: "string", default: "-" },
      { name: "side", type: '"top" | "bottom"', default: '"top"' },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: LinkPreview as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { href: "https://github.com", title: "GitHub", description: "Where developers build software", children: "GitHub" },
  },

  // ── CommandMenu ──
  {
    slug: "command-menu",
    name: "CommandMenu",
    category: "Navigation",
    description: "Cmd+K command palette with fuzzy search, grouped items, keyboard navigation, and shortcuts.",
    preview: (() => {
      function CommandMenuDemo() {
        const [open, setOpen] = React.useState(false);
        return (
          <div>
            <Button variant="raised" onClick={() => setOpen(true)}>
              Open Command Menu (⌘K)
            </Button>
            <CommandMenu
              open={open}
              onOpenChange={setOpen}
              items={[
                { id: "home", label: "Go to Home", icon: "🏠", group: "Navigation", shortcut: "⌘H" },
                { id: "docs", label: "Go to Docs", icon: "📖", group: "Navigation", shortcut: "⌘D" },
                { id: "search", label: "Search Components", icon: "🔍", group: "Actions", shortcut: "⌘F" },
                { id: "theme", label: "Toggle Theme", icon: "🌙", group: "Actions", shortcut: "⌘T" },
                { id: "github", label: "Open GitHub", icon: "🐙", group: "Links" },
                { id: "npm", label: "Open npm", icon: "📦", group: "Links" },
              ]}
            />
          </div>
        );
      }
      return <CommandMenuDemo />;
    })(),
    code: `import { CommandMenu } from "neumorui";

const [open, setOpen] = useState(false);

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={[
    { id: "home", label: "Go to Home", icon: "🏠", group: "Navigation", shortcut: "⌘H" },
    { id: "theme", label: "Toggle Theme", icon: "🌙", group: "Actions", shortcut: "⌘T" },
    { id: "github", label: "Open GitHub", icon: "🐙", group: "Links" },
  ]}
/>`,
    props: [
      { name: "items", type: "CommandMenuItem[]", default: "[]" },
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Type a command or search..."' },
      { name: "emptyMessage", type: "string", default: '"No results found."' },
      { name: "trigger", type: "string", default: '"k"' },
    ],
  },

  // ── Snackbar ──
  {
    slug: "snackbar",
    name: "Snackbar",
    category: "Feedback",
    description: "Bottom snackbar notification with action button, auto-dismiss, and 5 variants via useSnackbar hook.",
    preview: (() => {
      function SnackbarDemo() {
        const { snackbar } = useSnackbar();
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Button variant="raised" onClick={() => snackbar({ message: "File saved successfully!", variant: "success" })}>
              Success
            </Button>
            <Button variant="raised" onClick={() => snackbar({ message: "Something went wrong.", variant: "danger" })}>
              Error
            </Button>
            <Button variant="raised" onClick={() => snackbar({ message: "Item deleted.", action: { label: "Undo", onClick: () => {} } })}>
              With Action
            </Button>
          </div>
        );
      }
      return (
        <SnackbarProvider>
          <SnackbarDemo />
        </SnackbarProvider>
      );
    })(),
    code: `import { SnackbarProvider, useSnackbar } from "neumorui";

// Wrap app with provider
<SnackbarProvider>
  <App />
</SnackbarProvider>

// Use in any component
function MyComponent() {
  const { snackbar } = useSnackbar();

  return (
    <Button onClick={() => snackbar({
      message: "Item deleted.",
      variant: "danger",
      action: { label: "Undo", onClick: () => {} },
    })}>
      Delete
    </Button>
  );
}`,
    props: [
      { name: "message", type: "string", default: "-" },
      { name: "variant", type: '"default" | "success" | "danger" | "warning" | "info"', default: '"default"' },
      { name: "action", type: "{ label: string; onClick: () => void }", default: "-" },
      { name: "duration", type: "number", default: "4000" },
    ],
  },

  // ── Banner ──
  {
    slug: "banner",
    name: "Banner",
    category: "Feedback",
    description: "Full-width banner for announcements with icon, action slot, dismiss button, and sticky mode.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Banner variant="info" icon="ℹ️">
          System maintenance scheduled for tonight at 11 PM.
        </Banner>
        <Banner variant="success" icon="✅">
          Your profile has been updated successfully!
        </Banner>
        <Banner variant="warning" icon="⚠️" action={<Button variant="raised" size="sm">Learn More</Button>}>
          Your subscription expires in 3 days.
        </Banner>
      </div>
    ),
    code: `import { Banner, Button } from "neumorui";

<Banner variant="info" icon="ℹ️">
  System maintenance tonight at 11 PM.
</Banner>

<Banner
  variant="warning"
  icon="⚠️"
  sticky
  action={<Button size="sm">Learn More</Button>}
  onDismiss={() => console.log("dismissed")}
>
  Your subscription expires in 3 days.
</Banner>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "variant", type: '"default" | "info" | "success" | "warning" | "danger"', default: '"default"' },
      { name: "position", type: '"top" | "bottom"', default: '"top"' },
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "action", type: "ReactNode", default: "-" },
      { name: "dismissible", type: "boolean", default: "true" },
      { name: "onDismiss", type: "() => void", default: "-" },
      { name: "sticky", type: "boolean", default: "false" },
    ],
    component: Banner as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "Important announcement!", variant: "info", icon: "ℹ️" },
  },

  // ── InlineMessage ──
  {
    slug: "inline-message",
    name: "InlineMessage",
    category: "Feedback",
    description: "Inline contextual message with 4 variants, left border accent, and icon for form or section feedback.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "380px" }}>
        <InlineMessage variant="info">This field is optional but recommended.</InlineMessage>
        <InlineMessage variant="success">Email verified successfully!</InlineMessage>
        <InlineMessage variant="warning">Password is too short (min 8 chars).</InlineMessage>
        <InlineMessage variant="danger">This action cannot be undone.</InlineMessage>
      </div>
    ),
    code: `import { InlineMessage } from "neumorui";

<InlineMessage variant="info">
  This field is optional but recommended.
</InlineMessage>

<InlineMessage variant="danger">
  This action cannot be undone.
</InlineMessage>

<InlineMessage variant="success" icon="🎉">
  Custom icon support!
</InlineMessage>`,
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "danger"', default: '"info"' },
      { name: "icon", type: "ReactNode", default: "auto per variant" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
    component: InlineMessage as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "This field is required.", variant: "warning" },
  },

  // ── AudioPlayer ──
  {
    slug: "audio-player",
    name: "AudioPlayer",
    category: "Media",
    description: "Neumorphic audio player with play/pause, seek bar, volume control, cover art, and time display.",
    preview: (
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="Chill Vibes"
        artist="SoundHelix"
      />
    ),
    code: `import { AudioPlayer } from "neumorui";

<AudioPlayer
  src="/audio/song.mp3"
  title="Chill Vibes"
  artist="DJ Relax"
  coverArt="/album-art.jpg"
/>`,
    props: [
      { name: "src", type: "string", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "artist", type: "string", default: "-" },
      { name: "coverArt", type: "string", default: "-" },
    ],
    component: AudioPlayer as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Sample Track", artist: "Artist" },
  },

  // ── VideoPlayer ──
  {
    slug: "video-player",
    name: "VideoPlayer",
    category: "Media",
    description: "Custom video player with neumorphic overlay controls, seek, fullscreen, mute, and poster support.",
    preview: (
      <div style={{ maxWidth: "400px" }}>
        <VideoPlayer
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://picsum.photos/seed/vid/400/225"
        />
      </div>
    ),
    code: `import { VideoPlayer } from "neumorui";

<VideoPlayer
  src="/video/demo.mp4"
  poster="/video-poster.jpg"
  rounded={18}
/>`,
    props: [
      { name: "src", type: "string", default: "-" },
      { name: "poster", type: "string", default: "-" },
      { name: "rounded", type: "number", default: "18" },
      { name: "autoPlay", type: "boolean", default: "false" },
      { name: "muted", type: "boolean", default: "false" },
      { name: "loop", type: "boolean", default: "false" },
    ],
    component: VideoPlayer as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { src: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "https://picsum.photos/seed/vid/400/225" },
  },

  // ── CopyButton ──
  {
    slug: "copy-button",
    name: "CopyButton",
    category: "Utility",
    description: "Click-to-copy button with Copied! feedback, raised/flat/icon variants, and clipboard API.",
    preview: (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <CopyButton text="npm install neumorui" label="Copy" />
        <CopyButton text="pnpm add neumorui" variant="flat" label="Flat" />
        <CopyButton text="hello" variant="icon" />
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-secondary)", padding: "6px 12px", borderRadius: "10px", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-inset-sm)", fontFamily: "monospace" }}>
          npm install neumorui
        </span>
      </div>
    ),
    code: `import { CopyButton } from "neumorui";

<CopyButton text="npm install neumorui" />
<CopyButton text="some text" variant="icon" />
<CopyButton text="code" variant="flat" size="sm" />`,
    props: [
      { name: "text", type: "string", default: "-" },
      { name: "label", type: "string", default: '"Copy"' },
      { name: "copiedLabel", type: "string", default: '"Copied!"' },
      { name: "variant", type: '"raised" | "flat" | "icon"', default: '"raised"' },
      { name: "size", type: '"sm" | "md"', default: '"md"' },
    ],
    component: CopyButton as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { text: "npm install neumorui" },
  },

  // ── Kbd ──
  {
    slug: "kbd",
    name: "Kbd",
    category: "Utility",
    description: "Keyboard shortcut badge with neumorphic raised style and 3 sizes for displaying hotkeys.",
    preview: (
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
          <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open search
        </span>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
          <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
        </span>
        <span style={{ display: "flex", gap: "4px" }}>
          <Kbd size="sm">Esc</Kbd>
          <Kbd size="md">Tab</Kbd>
          <Kbd size="lg">Enter</Kbd>
        </span>
      </div>
    ),
    code: `import { Kbd } from "neumorui";

<p>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open search</p>
<p>Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy</p>

{/* Sizes */}
<Kbd size="sm">Esc</Kbd>
<Kbd size="md">Tab</Kbd>
<Kbd size="lg">Enter</Kbd>`,
    props: [
      { name: "children", type: "ReactNode", default: "-" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ],
    component: Kbd as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { children: "⌘K" },
  },

  // ── InfiniteScroll ──
  {
    slug: "infinite-scroll",
    name: "InfiniteScroll",
    category: "Utility",
    description: "Auto-load more on scroll with IntersectionObserver, loading spinner, and end message.",
    preview: (() => {
      function InfiniteScrollDemo() {
        const [items, setItems] = React.useState(Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`));
        const [loading, setLoading] = React.useState(false);
        const hasMore = items.length < 20;
        const loadMore = () => {
          setLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: 4 }, (_, i) => `Item ${prev.length + i + 1}`),
            ]);
            setLoading(false);
          }, 800);
        };
        return (
          <div style={{ maxHeight: "200px", overflowY: "auto", borderRadius: "14px", boxShadow: "var(--neu-shadow-inset)", padding: "8px" }}>
            <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} loading={loading}>
              {items.map((item, i) => (
                <div key={i} style={{ padding: "8px 12px", marginBottom: "6px", borderRadius: "10px", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: "12px", fontWeight: 600, color: "var(--neu-text-primary)" }}>
                  {item}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        );
      }
      return <InfiniteScrollDemo />;
    })(),
    code: `import { InfiniteScroll } from "neumorui";

const [items, setItems] = useState(initialItems);
const [loading, setLoading] = useState(false);

<InfiniteScroll
  onLoadMore={loadMore}
  hasMore={items.length < 100}
  loading={loading}
  threshold={100}
>
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</InfiniteScroll>`,
    props: [
      { name: "onLoadMore", type: "() => void", default: "-" },
      { name: "hasMore", type: "boolean", default: "-" },
      { name: "loading", type: "boolean", default: "false" },
      { name: "loader", type: "ReactNode", default: "spinner" },
      { name: "endMessage", type: "ReactNode", default: '"No more items"' },
      { name: "threshold", type: "number", default: "100" },
      { name: "children", type: "ReactNode", default: "-" },
    ],
  },

  // ── QRCode ──
  {
    slug: "qr-code",
    name: "QRCode",
    category: "Utility",
    description: "QR code generator with neumorphic frame, rounded dots, custom colors, and optional label.",
    preview: (
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <QRCode value="https://neumorui.dev" size={140} label="neumorui.dev" />
        <QRCode value="Hello NeumorUI!" size={140} fgColor="var(--neu-accent)" label="Custom color" />
      </div>
    ),
    code: `import { QRCode } from "neumorui";

<QRCode
  value="https://neumorui.dev"
  size={160}
  label="Scan me"
/>

<QRCode
  value="custom data"
  fgColor="var(--neu-accent)"
  rounded
/>`,
    props: [
      { name: "value", type: "string", default: "-" },
      { name: "size", type: "number", default: "160" },
      { name: "fgColor", type: "string", default: "var(--neu-text-primary)" },
      { name: "bgColor", type: "string", default: "var(--neu-bg)" },
      { name: "rounded", type: "boolean", default: "true" },
      { name: "label", type: "string", default: "-" },
    ],
    component: QRCode as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { value: "https://neumorui.vercel.app", label: "Scan me" },
  },

  // ── MusicPlayerCard ──
  {
    slug: "music-player-card",
    name: "MusicPlayerCard",
    category: "Showpiece",
    description: "Full music player UI with album art, play controls, progress bar, like button, and shuffle/repeat.",
    preview: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MusicPlayerCard
          title="Midnight Dreams"
          artist="NeumorUI"
          album="Clay Sessions"
          coverArt="https://picsum.photos/seed/music1/300/300"
          progress={42}
          currentTime="1:32"
          duration="3:45"
        />
      </div>
    ),
    code: `import { MusicPlayerCard } from "neumorui";

<MusicPlayerCard
  title="Midnight Dreams"
  artist="NeumorUI"
  album="Clay Sessions"
  coverArt="/album-art.jpg"
  progress={42}
  currentTime="1:32"
  duration="3:45"
  playing={isPlaying}
  onPlay={() => play()}
  onPause={() => pause()}
  onNext={() => next()}
  onPrev={() => prev()}
/>`,
    props: [
      { name: "title", type: "string", default: "-" },
      { name: "artist", type: "string", default: "-" },
      { name: "album", type: "string", default: "-" },
      { name: "coverArt", type: "string", default: "-" },
      { name: "progress", type: "number", default: "0" },
      { name: "currentTime", type: "string", default: '"0:00"' },
      { name: "duration", type: "string", default: '"0:00"' },
      { name: "playing", type: "boolean", default: "false" },
      { name: "onPlay / onPause", type: "() => void", default: "-" },
      { name: "onNext / onPrev", type: "() => void", default: "-" },
    ],
    component: MusicPlayerCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { title: "Midnight Dreams", artist: "NeumorUI", album: "Clay Sessions", coverArt: "https://picsum.photos/seed/music1/300/300", progress: 42, currentTime: "1:32", duration: "3:45" },
  },

  // ── WeatherCard ──
  {
    slug: "weather-card",
    name: "WeatherCard",
    category: "Showpiece",
    description: "Weather display card with temperature, condition icon, details chips, and multi-day forecast.",
    preview: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <WeatherCard
          location="Dhaka, Bangladesh"
          temperature={32}
          condition="Partly Cloudy"
          icon="⛅"
          humidity={78}
          wind="12 km/h"
          feelsLike={36}
          forecast={[
            { day: "Mon", icon: "☀️", high: 34, low: 26 },
            { day: "Tue", icon: "⛅", high: 32, low: 25 },
            { day: "Wed", icon: "🌧️", high: 29, low: 24 },
            { day: "Thu", icon: "⛈️", high: 28, low: 23 },
            { day: "Fri", icon: "☀️", high: 33, low: 25 },
          ]}
        />
      </div>
    ),
    code: `import { WeatherCard } from "neumorui";

<WeatherCard
  location="Dhaka, Bangladesh"
  temperature={32}
  condition="Partly Cloudy"
  icon="⛅"
  humidity={78}
  wind="12 km/h"
  feelsLike={36}
  forecast={[
    { day: "Mon", icon: "☀️", high: 34, low: 26 },
    { day: "Tue", icon: "⛅", high: 32, low: 25 },
  ]}
/>`,
    props: [
      { name: "location", type: "string", default: "-" },
      { name: "temperature", type: "number", default: "-" },
      { name: "unit", type: '"C" | "F"', default: '"C"' },
      { name: "condition", type: "string", default: "-" },
      { name: "icon", type: "string", default: '"☀️"' },
      { name: "humidity", type: "number", default: "-" },
      { name: "wind", type: "string", default: "-" },
      { name: "feelsLike", type: "number", default: "-" },
      { name: "forecast", type: "ForecastDay[]", default: "[]" },
    ],
    component: WeatherCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { location: "New York", temperature: 22, condition: "Sunny", icon: "☀️", humidity: 55, wind: "10 km/h" },
  },

  // ── ChatBubble ──
  {
    slug: "chat-bubble",
    name: "ChatBubble",
    category: "Showpiece",
    description: "Chat message bubble with sent/received variants, avatar, name, timestamp, and read status.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
        <ChatBubble
          variant="received"
          message="Hey! How's the NeumorUI project going?"
          name="Sarah"
          avatar="https://i.pravatar.cc/150?img=5"
          time="10:30 AM"
        />
        <ChatBubble
          variant="sent"
          message="Going great! Just finished the last batch of components. 98 total now!"
          time="10:32 AM"
          status="read"
        />
        <ChatBubble
          variant="received"
          message="That's amazing! Can't wait to try them out 🎉"
          name="Sarah"
          avatar="https://i.pravatar.cc/150?img=5"
          time="10:33 AM"
        />
      </div>
    ),
    code: `import { ChatBubble } from "neumorui";

<ChatBubble
  variant="received"
  message="Hey! How's it going?"
  name="Sarah"
  avatar="/avatar.jpg"
  time="10:30 AM"
/>

<ChatBubble
  variant="sent"
  message="Going great!"
  time="10:32 AM"
  status="read"
/>`,
    props: [
      { name: "message", type: "string", default: "-" },
      { name: "variant", type: '"sent" | "received"', default: '"received"' },
      { name: "avatar", type: "string", default: "-" },
      { name: "name", type: "string", default: "-" },
      { name: "time", type: "string", default: "-" },
      { name: "status", type: '"sent" | "delivered" | "read"', default: "-" },
    ],
    component: ChatBubble as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { message: "Hello there!", variant: "received", name: "Sarah", time: "10:30 AM" },
  },

  // ── NotificationCenter ──
  {
    slug: "notification-center",
    name: "NotificationCenter",
    category: "Showpiece",
    description: "Dropdown notification panel with bell trigger, badge count, grouped items, read/unread, and clear.",
    preview: (
      <div style={{ display: "flex", justifyContent: "center", minHeight: "60px" }}>
        <NotificationCenter
          notifications={[
            { id: "1", icon: "📦", title: "New order received", description: "Order #1234 placed by John", time: "2m ago", group: "Today" },
            { id: "2", icon: "💬", title: "New comment", description: "Alex replied to your post", time: "15m ago", group: "Today" },
            { id: "3", icon: "⭐", title: "New review", description: "5-star rating on NeumorUI", time: "1h ago", group: "Today", read: true },
            { id: "4", icon: "🔔", title: "System update", description: "v2.0 is available", time: "Yesterday", group: "Earlier", read: true },
          ]}
          onReadAll={() => {}}
          onClear={() => {}}
        />
      </div>
    ),
    code: `import { NotificationCenter } from "neumorui";

<NotificationCenter
  notifications={[
    { id: "1", icon: "📦", title: "New order", description: "Order #1234", time: "2m ago", group: "Today" },
    { id: "2", icon: "💬", title: "New comment", time: "15m ago", group: "Today" },
    { id: "3", icon: "⭐", title: "New review", time: "1h ago", read: true, group: "Earlier" },
  ]}
  onRead={(id) => markRead(id)}
  onReadAll={() => markAllRead()}
  onClear={(id) => remove(id)}
/>`,
    props: [
      { name: "notifications", type: "NotificationItem[]", default: "[]" },
      { name: "onRead", type: "(id: string) => void", default: "-" },
      { name: "onReadAll", type: "() => void", default: "-" },
      { name: "onClear", type: "(id: string) => void", default: "-" },
      { name: "trigger", type: "ReactNode", default: "bell button" },
    ],
  },

  // ── Onboarding ──
  {
    slug: "onboarding",
    name: "Onboarding",
    category: "Showpiece",
    description: "Step-by-step onboarding flow with spotlight highlight, tooltip, progress bar, and skip/next controls.",
    preview: (() => {
      function OnboardingDemo() {
        const [active, setActive] = React.useState(false);
        return (
          <div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Button id="onboard-btn" variant="primary" onClick={() => setActive(true)}>
                Start Onboarding
              </Button>
              <span id="onboard-text" style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-secondary)" }}>
                Click to see the demo
              </span>
            </div>
            <Onboarding
              active={active}
              onComplete={() => setActive(false)}
              onSkip={() => setActive(false)}
              steps={[
                { target: "#onboard-btn", title: "Welcome!", description: "This button triggers actions. Click Next to continue.", position: "bottom" },
                { target: "#onboard-text", title: "Helpful Text", description: "This area shows contextual information about the current state.", position: "bottom" },
              ]}
            />
          </div>
        );
      }
      return <OnboardingDemo />;
    })(),
    code: `import { Onboarding } from "neumorui";

const [active, setActive] = useState(true);

<Onboarding
  active={active}
  onComplete={() => setActive(false)}
  onSkip={() => setActive(false)}
  steps={[
    { target: "#step1", title: "Welcome!", description: "Let's get started.", position: "bottom" },
    { target: "#step2", title: "Dashboard", description: "View your stats here.", position: "right" },
    { target: "#step3", title: "Settings", description: "Configure your preferences.", position: "left" },
  ]}
/>`,
    props: [
      { name: "steps", type: "OnboardingStep[]", default: "[]" },
      { name: "active", type: "boolean", default: "true" },
      { name: "onComplete", type: "() => void", default: "-" },
      { name: "onSkip", type: "() => void", default: "-" },
    ],
  },

  // ── DateRangePicker ──
  {
    slug: "date-range-picker",
    name: "DateRangePicker",
    category: "Date",
    description: "Date range selector with calendar popover, start/end highlighting, and keyboard navigation.",
    preview: (
      <div style={{ maxWidth: "320px" }}>
        <DateRangePicker label="Stay Period" />
      </div>
    ),
    code: `import { DateRangePicker } from "neumorui";

<DateRangePicker
  label="Stay Period"
  onChange={(start, end) => console.log(start, end)}
/>`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "startDate", type: "string", default: "-" },
      { name: "endDate", type: "string", default: "-" },
      { name: "onChange", type: "(start, end) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Select date range"' },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "error", type: "string", default: "-" },
    ],
    component: DateRangePicker as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Date Range" },
  },

  // ── TimePicker ──
  {
    slug: "time-picker",
    name: "TimePicker",
    category: "Date",
    description: "Time selector with hour/minute spinners, AM/PM toggle, and 24-hour mode support.",
    preview: (
      <div style={{ maxWidth: "280px" }}>
        <TimePicker label="Meeting Time" />
      </div>
    ),
    code: `import { TimePicker } from "neumorui";

<TimePicker
  label="Meeting Time"
  onChange={(time) => console.log(time)}
/>

<TimePicker use24Hour minuteStep={15} />`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "value", type: "string", default: "-" },
      { name: "onChange", type: "(time: string) => void", default: "-" },
      { name: "use24Hour", type: "boolean", default: "false" },
      { name: "minuteStep", type: "number", default: "5" },
      { name: "placeholder", type: "string", default: '"Select time"' },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "error", type: "string", default: "-" },
    ],
    component: TimePicker as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Time" },
  },

  // ── TableOfContents ──
  {
    slug: "table-of-contents",
    name: "TableOfContents",
    category: "Navigation",
    description: "Auto-tracking table of contents with scroll spy, indented headings, and active indicator.",
    preview: (
      <div style={{ maxWidth: "240px" }}>
        <TableOfContents
          items={[
            { id: "intro", text: "Introduction", level: 1 },
            { id: "install", text: "Installation", level: 1 },
            { id: "npm", text: "Using npm", level: 2 },
            { id: "pnpm", text: "Using pnpm", level: 2 },
            { id: "usage", text: "Usage", level: 1 },
            { id: "api", text: "API Reference", level: 1 },
          ]}
          activeId="install"
        />
      </div>
    ),
    code: `import { TableOfContents } from "neumorui";

<TableOfContents
  items={[
    { id: "intro", text: "Introduction", level: 1 },
    { id: "install", text: "Installation", level: 1 },
    { id: "npm", text: "Using npm", level: 2 },
  ]}
/>`,
    props: [
      { name: "items", type: "TOCItem[]", default: "[]" },
      { name: "activeId", type: "string", default: "auto (scroll spy)" },
      { name: "onItemClick", type: "(id: string) => void", default: "-" },
      { name: "title", type: "string", default: '"On this page"' },
    ],
    component: TableOfContents as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { items: [{ id: "intro", text: "Introduction", level: 1 }, { id: "install", text: "Installation", level: 1 }, { id: "usage", text: "Usage", level: 1 }] },
  },

  // ── ThemeCustomizer ──
  {
    slug: "theme-customizer",
    name: "ThemeCustomizer",
    category: "Utility",
    description: "Live theme editor with color presets, custom color pickers, and border radius control.",
    preview: (
      <ThemeCustomizer position="inline" />
    ),
    code: `import { ThemeCustomizer } from "neumorui";

{/* Fixed position — floating top-right (default) */}
<ThemeCustomizer />

{/* Inline position — inside a card/section */}
<ThemeCustomizer position="inline" />`,
    props: [
      { name: "onThemeChange", type: "(vars: Record<string, string>) => void", default: "-" },
      { name: "open", type: "boolean", default: "-" },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
      { name: "position", type: '"fixed" | "inline"', default: '"fixed"' },
    ],
  },

  // ── MultiSelect ──
  {
    slug: "multi-select",
    name: "MultiSelect",
    category: "Form",
    description: "Multi-option dropdown with tag chips, search filter, checkbox indicators, and max limit.",
    preview: (
      <div style={{ maxWidth: "340px" }}>
        <MultiSelect
          label="Skills"
          options={[
            { value: "react", label: "React" },
            { value: "typescript", label: "TypeScript" },
            { value: "node", label: "Node.js" },
            { value: "python", label: "Python" },
            { value: "go", label: "Go" },
            { value: "rust", label: "Rust" },
          ]}
          placeholder="Select skills..."
        />
      </div>
    ),
    code: `import { MultiSelect } from "neumorui";

<MultiSelect
  label="Skills"
  options={[
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "node", label: "Node.js" },
  ]}
  onChange={(selected) => console.log(selected)}
  maxSelected={3}
/>`,
    props: [
      { name: "options", type: "MultiSelectOption[]", default: "[]" },
      { name: "value", type: "string[]", default: "-" },
      { name: "onChange", type: "(selected: string[]) => void", default: "-" },
      { name: "label", type: "string", default: "-" },
      { name: "placeholder", type: "string", default: '"Select..."' },
      { name: "maxSelected", type: "number", default: "-" },
      { name: "searchable", type: "boolean", default: "true" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "error", type: "string", default: "-" },
    ],
    component: MultiSelect as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Skills", options: [{ value: "react", label: "React" }, { value: "ts", label: "TypeScript" }], placeholder: "Select..." },
  },

  // ── AvatarGroup ──
  {
    slug: "avatar-group",
    name: "AvatarGroup",
    category: "Data Display",
    description: "Stacked avatar group with overlap, hover lift, +N overflow indicator, and initials fallback.",
    preview: (
      <AvatarGroup
        avatars={[
          { src: "https://i.pravatar.cc/150?img=1", name: "Alice" },
          { src: "https://i.pravatar.cc/150?img=2", name: "Bob" },
          { src: "https://i.pravatar.cc/150?img=3", name: "Carol" },
          { name: "Dave" },
          { name: "Eve" },
          { name: "Frank" },
        ]}
        max={4}
      />
    ),
    code: `import { AvatarGroup } from "neumorui";

<AvatarGroup
  avatars={[
    { src: "/avatar1.jpg", name: "Alice" },
    { src: "/avatar2.jpg", name: "Bob" },
    { name: "Carol" },
    { name: "Dave" },
  ]}
  max={3}
  size={44}
/>`,
    props: [
      { name: "avatars", type: "AvatarGroupItem[]", default: "[]" },
      { name: "max", type: "number", default: "4" },
      { name: "size", type: "number", default: "40" },
      { name: "overlap", type: "number", default: "10" },
    ],
    component: AvatarGroup as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { avatars: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }], max: 3 },
  },

  // ── RichTextEditor ──
  {
    slug: "rich-text-editor",
    name: "RichTextEditor",
    category: "Form",
    description: "WYSIWYG rich text editor with formatting toolbar, headings, lists, links, and code blocks.",
    preview: (
      <RichTextEditor label="Content" placeholder="Write something beautiful..." />
    ),
    code: `import { RichTextEditor } from "neumorui";

<RichTextEditor
  label="Content"
  placeholder="Start writing..."
  onChange={(html) => console.log(html)}
/>`,
    props: [
      { name: "value", type: "string", default: "-" },
      { name: "onChange", type: "(html: string) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Start writing..."' },
      { name: "label", type: "string", default: "-" },
      { name: "minHeight", type: "number", default: "150" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: RichTextEditor as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Content", placeholder: "Start writing..." },
  },

  // ── MarkdownEditor ──
  {
    slug: "markdown-editor",
    name: "MarkdownEditor",
    category: "Form",
    description: "Split-pane markdown editor with write/preview tabs, live rendering, and monospace input.",
    preview: (
      <MarkdownEditor label="Notes" placeholder="# Hello\n\nWrite **markdown** here..." />
    ),
    code: `import { MarkdownEditor } from "neumorui";

<MarkdownEditor
  label="Notes"
  placeholder="# Hello\n\nWrite **markdown** here..."
  onChange={(md) => console.log(md)}
/>`,
    props: [
      { name: "value", type: "string", default: "-" },
      { name: "onChange", type: "(markdown: string) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Write markdown here..."' },
      { name: "label", type: "string", default: "-" },
      { name: "minHeight", type: "number", default: "180" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: MarkdownEditor as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Notes", placeholder: "Write markdown..." },
  },

  // ── ChatInput ──
  {
    slug: "chat-input",
    name: "ChatInput",
    category: "AI Chat",
    description: "Auto-expanding chat input with send button, attachment support, Enter to send, and character count.",
    preview: <ChatInput placeholder="Type a message..." />,
    code: `import { ChatInput } from "neumorui";

<ChatInput
  onSend={(msg) => console.log(msg)}
  placeholder="Ask me anything..."
  showAttachment
  maxLength={500}
/>`,
    props: [
      { name: "value", type: "string", default: "-" },
      { name: "onChange", type: "(value: string) => void", default: "-" },
      { name: "onSend", type: "(message: string) => void", default: "-" },
      { name: "onAttach", type: "(files: FileList) => void", default: "-" },
      { name: "placeholder", type: "string", default: '"Type a message..."' },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "loading", type: "boolean", default: "false" },
      { name: "maxLength", type: "number", default: "-" },
      { name: "showAttachment", type: "boolean", default: "false" },
      { name: "maxRows", type: "number", default: "6" },
      { name: "autoFocus", type: "boolean", default: "false" },
    ],
    component: ChatInput as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { placeholder: "Ask me anything..." },
  },

  // ── MessageList ──
  {
    slug: "message-list",
    name: "MessageList",
    category: "AI Chat",
    description: "Scrollable chat message container with auto-scroll, day separators, and user/assistant/system roles.",
    preview: (
      <MessageList
        maxHeight="300px"
        messages={[
          { id: "1", role: "user", content: "Hey! Can you help me?" },
          { id: "2", role: "assistant", content: "Of course! What do you need?", name: "AI" },
          { id: "3", role: "user", content: "Build a chat UI with NeumorUI" },
          { id: "4", role: "assistant", content: "Great choice! NeumorUI has ChatInput, MessageList, and StreamingText components for that.", name: "AI" },
        ]}
      />
    ),
    code: `import { MessageList } from "neumorui";

<MessageList
  messages={messages}
  showDaySeparators
  maxHeight="500px"
  onScrollTop={() => loadMore()}
/>`,
    props: [
      { name: "messages", type: "ChatMessage[]", default: "[]" },
      { name: "renderMessage", type: "(msg) => ReactNode", default: "-" },
      { name: "loading", type: "boolean", default: "false" },
      { name: "emptyState", type: "ReactNode", default: '"No messages yet"' },
      { name: "showDaySeparators", type: "boolean", default: "false" },
      { name: "onScrollTop", type: "() => void", default: "-" },
      { name: "autoScroll", type: "boolean", default: "true" },
      { name: "maxHeight", type: "string | number", default: '"500px"' },
    ],
  },

  // ── StreamingText ──
  {
    slug: "streaming-text",
    name: "StreamingText",
    category: "AI Chat",
    description: "Typewriter streaming text effect with blinking cursor, skip-on-click, and imperative ref handle.",
    preview: (
      <StreamingText
        text="Hello! I'm an AI assistant built with NeumorUI. I can help you build beautiful neumorphic interfaces."
        speed={30}
        skipOnClick
      />
    ),
    code: `import { StreamingText } from "neumorui";

<StreamingText
  text="Hello! I'm an AI assistant..."
  speed={40}
  skipOnClick
  onComplete={() => console.log("Done!")}
/>

// With ref for imperative control
const ref = useRef<StreamingTextHandle>(null);
ref.current?.skip();
ref.current?.restart();`,
    props: [
      { name: "text", type: "string", default: "-" },
      { name: "speed", type: "number", default: "40" },
      { name: "startDelay", type: "number", default: "0" },
      { name: "showCursor", type: "boolean", default: "true" },
      { name: "cursorChar", type: "string", default: '"▊"' },
      { name: "onComplete", type: "() => void", default: "-" },
      { name: "skipOnClick", type: "boolean", default: "false" },
      { name: "paused", type: "boolean", default: "false" },
    ],
    component: StreamingText as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { text: "Hello! I'm streaming text...", speed: 30 },
  },

  // ── ThinkingIndicator ──
  {
    slug: "thinking-indicator",
    name: "ThinkingIndicator",
    category: "AI Chat",
    description: "Animated AI thinking indicator with dots, wave, pulse, and typing variants in 3 sizes.",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ThinkingIndicator variant="dots" label="Thinking..." />
        <ThinkingIndicator variant="wave" label="Generating..." />
        <ThinkingIndicator variant="pulse" label="Processing..." />
        <ThinkingIndicator variant="typing" label="Typing..." />
      </div>
    ),
    code: `import { ThinkingIndicator } from "neumorui";

<ThinkingIndicator variant="dots" label="Thinking..." />
<ThinkingIndicator variant="wave" label="Generating..." size="lg" />
<ThinkingIndicator variant="pulse" avatar="/ai-avatar.png" />`,
    props: [
      { name: "label", type: "string", default: "-" },
      { name: "avatar", type: "string", default: "-" },
      { name: "variant", type: '"dots" | "wave" | "pulse" | "typing"', default: '"dots"' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
      { name: "accentColor", type: "string", default: "var(--neu-accent)" },
    ],
    component: ThinkingIndicator as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { label: "Thinking...", variant: "dots" },
  },

  // ── PromptCard ──
  {
    slug: "prompt-card",
    name: "PromptCard",
    category: "AI Chat",
    description: "Clickable AI prompt suggestion card with icon, title, description, and category badge.",
    preview: (
      <PromptGrid
        columns={2}
        onSelect={() => {}}
        prompts={[
          { icon: "💡", title: "Explain code", description: "Break down complex code", category: "Coding", prompt: "Explain this code" },
          { icon: "✍️", title: "Write a blog", description: "Create engaging content", category: "Writing", prompt: "Write a blog post" },
          { icon: "🐛", title: "Debug error", description: "Find and fix bugs", category: "Coding", prompt: "Debug this error" },
          { icon: "🎨", title: "Design UI", description: "Create beautiful interfaces", category: "Design", prompt: "Design a UI" },
        ]}
      />
    ),
    code: `import { PromptCard, PromptGrid } from "neumorui";

{/* Single card */}
<PromptCard
  icon="💡"
  title="Explain code"
  description="Break down complex code"
  category="Coding"
  prompt="Explain this code step by step"
  onClick={(prompt) => sendMessage(prompt)}
/>

{/* Grid of cards */}
<PromptGrid
  columns={2}
  onSelect={(prompt) => sendMessage(prompt)}
  prompts={[...]}
/>`,
    props: [
      { name: "icon", type: "ReactNode", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "description", type: "string", default: "-" },
      { name: "category", type: "string", default: "-" },
      { name: "prompt", type: "string", default: "-" },
      { name: "onClick", type: "(prompt: string) => void", default: "-" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    component: PromptCard as unknown as React.ComponentType<Record<string, unknown>>,
    defaultProps: { icon: "💡", title: "Explain code", prompt: "Explain this code" },
  },

  // ── AlertDialog ──
  {
    slug: "alert-dialog",
    name: "AlertDialog",
    category: "Overlay",
    description: "Popup alert/confirm dialog with OK/Cancel buttons, 5 variants, icon, and useAlertDialog hook.",
    preview: (() => {
      function AlertDialogDemo() {
        const { alert, confirm } = useAlertDialog();
        return (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button variant="raised" onClick={() => alert({ title: "Saved!", message: "Your changes have been saved.", variant: "success" })}>
              Success Alert
            </Button>
            <Button variant="raised" onClick={() => alert({ title: "Error", message: "Something went wrong.", variant: "danger" })}>
              Error Alert
            </Button>
            <Button variant="raised" onClick={() => confirm({ title: "Delete?", message: "This cannot be undone.", variant: "warning", cancelText: "Cancel", okText: "Delete" })}>
              Confirm Dialog
            </Button>
          </div>
        );
      }
      return <AlertDialogProvider><AlertDialogDemo /></AlertDialogProvider>;
    })(),
    code: `import { AlertDialogProvider, useAlertDialog } from "neumorui";

// Wrap app with provider
<AlertDialogProvider>
  <App />
</AlertDialogProvider>

// Use anywhere
const { alert, confirm } = useAlertDialog();

// Simple alert
alert({
  title: "Saved!",
  message: "Your changes have been saved.",
  variant: "success",
});

// Confirm dialog
confirm({
  title: "Delete?",
  message: "This cannot be undone.",
  variant: "danger",
  okText: "Delete",
  cancelText: "Cancel",
  onOk: () => deleteItem(),
});`,
    props: [
      { name: "open", type: "boolean", default: "false" },
      { name: "onClose", type: "() => void", default: "-" },
      { name: "title", type: "string", default: "-" },
      { name: "message", type: "ReactNode", default: "-" },
      { name: "variant", type: '"default" | "success" | "danger" | "warning" | "info"', default: '"default"' },
      { name: "icon", type: "ReactNode", default: "auto per variant" },
      { name: "okText", type: "string", default: '"OK"' },
      { name: "cancelText", type: "string", default: "-" },
      { name: "onOk", type: "() => void", default: "-" },
      { name: "onCancel", type: "() => void", default: "-" },
    ],
  },
];
