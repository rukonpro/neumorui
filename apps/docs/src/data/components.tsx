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
    <Grid cols={3} gap={12}>
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
    <Grid cols={12} gap={12}>
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
          ],
          cta: { label: "Upgrade", variant: "primary" },
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
        slides={[
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>Slide 1</h3>
                <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>First slide content</p>
              </div>
            ),
          },
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>Slide 2</h3>
                <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Second slide content</p>
              </div>
            ),
          },
          {
            content: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>Slide 3</h3>
                <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Third slide content</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT DOCS REGISTRY — 61 components
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
  },
  {
    slug: "grid",
    name: "Grid",
    category: "Layout",
    description: "CSS Grid wrapper with responsive column control and auto-fit support.",
    preview: <GridDemo />,
    code: `import { Grid } from "neumorui";

<Grid cols={3} gap={12}>
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
  },
  {
    slug: "col",
    name: "Col",
    category: "Layout",
    description: "Grid column component for controlling span, start and end positions within a Grid.",
    preview: <ColDemo />,
    code: `import { Grid, Col } from "neumorui";

<Grid cols={12} gap={12}>
  <Col span={4}><div>span=4</div></Col>
  <Col span={8}><div>span=8</div></Col>
</Grid>`,
    props: [
      { name: "span", type: "number", default: "-" },
      { name: "start", type: "number", default: "-" },
      { name: "end", type: "number", default: "-" },
    ],
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
    ],
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
    description: "Slide carousel with prev/next buttons, dot indicators, and autoplay.",
    preview: <CarouselDemo />,
    code: `import { Carousel } from "neumorui";

<Carousel
  autoPlay
  interval={4000}
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
    ],
  },
];
