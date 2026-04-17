"use client";

import { useState } from "react";
import {
  Accordion,
  ActivityFeed,
  Alert,
  AnnouncementBar,
  Avatar,
  Badge,
  BarChart,
  BottomNav,
  Breadcrumb,
  BrowserTabs,
  Button,
  Card,
  Carousel,
  Checkbox,
  ComparisonTable,
  ConfirmDialog,
  CookieConsent,
  DonutChart,
  Drawer,
  Divider,
  Grid,
  Col,
  Heatmap,
  Hero,
  Input,
  KanbanBoard,
  LineChart,
  LoadingOverlay,
  Marquee,
  Modal,
  Navbar,
  Pagination,
  PricingCard,
  Progress,
  RadioGroup,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  SpeedDial,
  StatsCard,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  Toast,
  ToastProvider,
  useToast,
  ToggleGroup,
  Tooltip,
  TreeView,
  useNeuTheme,
} from "neumorui";

export default function Home() {
  return (
    <ToastProvider>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        <TopBar />
        <HeroSection />
        <SectionLabel>Stats & Charts</SectionLabel>
        <StatsSection />
        <SectionLabel>Form Controls</SectionLabel>
        <FormSection />
        <SectionLabel>Buttons</SectionLabel>
        <ButtonSection />
        <SectionLabel>Navigation</SectionLabel>
        <NavigationSection />
        <SectionLabel>Data Display</SectionLabel>
        <DataSection />
        <SectionLabel>Feedback</SectionLabel>
        <FeedbackSection />
        <SectionLabel>Overlay</SectionLabel>
        <OverlaySection />
        <SectionLabel>Layout</SectionLabel>
        <LayoutSection />
        <SectionLabel>Install</SectionLabel>
        <InstallBlock />
      </div>
    </ToastProvider>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--neu-text-muted)", marginBottom: "16px", marginTop: "48px" }}>
      {children}
    </p>
  );
}

function TopBar() {
  const { theme, toggleTheme } = useNeuTheme();
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
      <Button variant="pill" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
}

function HeroSection() {
  return (
    <Hero
      eyebrow="Clay · Soft UI"
      title={<>Light from <span style={{ color: "var(--neu-accent)" }}>within</span></>}
      subtitle="61 React components with neumorphic design, dark mode, animations, and TypeScript support."
      actions={
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button variant="primary" size="lg">Get started →</Button>
          <Button variant="raised" size="lg">View docs</Button>
        </div>
      }
    />
  );
}

function StatsSection() {
  return (
    <Grid cols={12} gap={16}>
      <Col span={7}>
        <Card>
          <SectionLabel>Bar Chart</SectionLabel>
          <BarChart
            data={[
              { label: "Jan", value: 55 },
              { label: "Feb", value: 70 },
              { label: "Mar", value: 45 },
              { label: "Apr", value: 80 },
              { label: "May", value: 65 },
              { label: "Jun", value: 90 },
              { label: "Jul", value: 72 },
            ]}
            title="Monthly revenue"
            trend={<Badge variant="success">↑ 24%</Badge>}
          />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Progress</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Progress value={74} label="Monthly goal" showLabel />
            <Progress value={51} variant="success" label="Storage" showLabel />
            <Progress value={88} variant="danger" label="CPU load" showLabel />
          </div>
        </Card>
      </Col>
      <Col span={5}>
        <Grid cols={1} gap={16}>
          <StatsCard label="Revenue" value="$48.2k" color="var(--neu-accent)" trend={{ value: "18%", direction: "up" }} />
          <StatsCard label="Users" value="9,240" color="var(--neu-danger)" trend={{ value: "12%", direction: "up" }} />
          <StatsCard label="Uptime" value="94%" color="var(--neu-success)" trend={{ value: "0.4%", direction: "down" }} />
        </Grid>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Donut Chart</SectionLabel>
          <DonutChart
            segments={[
              { label: "Design", value: 42, color: "#6c7ef8" },
              { label: "Development", value: 32, color: "#5ecba1" },
              { label: "Research", value: 26, color: "#f9c74f" },
            ]}
            centerValue="74%"
            centerLabel="complete"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Line Chart</SectionLabel>
          <LineChart
            data={[
              { label: "Mon", value: 320 },
              { label: "Tue", value: 480 },
              { label: "Wed", value: 390 },
              { label: "Thu", value: 620 },
              { label: "Fri", value: 540 },
              { label: "Sat", value: 780 },
              { label: "Sun", value: 650 },
            ]}
          />
        </Card>
      </Col>
    </Grid>
  );
}

function FormSection() {
  const [notify, setNotify] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [agree, setAgree] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [volume, setVolume] = useState([60]);

  return (
    <Grid cols={12} gap={16}>
      <Col span={5}>
        <Card>
          <SectionLabel>Form inputs</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input label="Full name" leftIcon="◎" placeholder="Enter your name" />
            <Input label="Email" leftIcon="✉" placeholder="you@example.com" type="email" />
            <Select
              label="Role"
              options={[
                { value: "designer", label: "Designer" },
                { value: "developer", label: "Developer" },
                { value: "manager", label: "Manager" },
              ]}
              placeholder="Select role"
            />
            <Textarea label="Message" placeholder="Write your message..." />
            <Button variant="primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
              Save changes
            </Button>
          </div>
        </Card>
      </Col>
      <Col span={7}>
        <Card>
          <SectionLabel>Controls</SectionLabel>
          <Grid cols={2} gap={20}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Toggles</p>
              <Switch label="Dark mode" description="Switch theme" checked={notify} onCheckedChange={setNotify} />
              <Switch label="Notifications" description="Push alerts" checked={false} />
              <Switch label="Auto-save" description="Every 5 min" checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-text-muted)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Checkboxes</p>
              <Checkbox label="Include analytics" checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
              <Checkbox label="Newsletter" checked={newsletter} onCheckedChange={(v) => setNewsletter(v === true)} />
              <Checkbox label="Agree to terms" checked={true} />
              <Checkbox label="Remember me" />
            </div>
          </Grid>
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Slider</SectionLabel>
          <Slider label="Volume" value={volume} onValueChange={setVolume} />
          <div style={{ marginTop: "12px" }}>
            <Progress value={volume[0]} showLabel />
          </div>
        </Card>
      </Col>
    </Grid>
  );
}

function ButtonSection() {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <Button variant="primary">Get started</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="success">Confirm</Button>
          <Button variant="raised">Default</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <Button variant="pill">All</Button>
          <Button variant="pill">Design</Button>
          <Button variant="pill">Dev</Button>
          <Button variant="pill">Motion</Button>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button variant="icon">♡</Button>
          <Button variant="icon">⤴</Button>
          <Button variant="icon">⚙</Button>
          <Button variant="primary" style={{ flex: 1, justifyContent: "center" }}>
            Continue →
          </Button>
        </div>
      </div>
    </Card>
  );
}

function NavigationSection() {
  const [activeTab, setActiveTab] = useState("home");
  const [btabs, setBtabs] = useState([
    { id: "home", label: "Home", icon: "🏠" },
    { id: "comp", label: "Components", icon: "📦", badge: 12 },
    { id: "themes", label: "Themes", icon: "🎨" },
  ]);

  return (
    <Grid cols={12} gap={16}>
      <Col span={12}>
        <Navbar
          brand="NeumorUI"
          links={[
            { label: "Home", href: "#", active: true },
            { label: "Components", href: "#" },
            { label: "Docs", href: "#" },
            { label: "Blog", href: "#" },
          ]}
        />
      </Col>
      <Col span={5}>
        <Sidebar
          brand="NeumorUI"
          items={[
            { label: "Dashboard", icon: "🏠", badge: "3", active: true, group: "Main" },
            { label: "Components", icon: "📦", group: "Main" },
            { label: "Themes", icon: "🎨", group: "Main" },
            { label: "Analytics", icon: "📊", group: "Main" },
            { label: "Profile", icon: "👤", group: "Account" },
            { label: "Settings", icon: "⚙️", group: "Account" },
          ]}
        />
      </Col>
      <Col span={7}>
        <Card>
          <SectionLabel>Tabs</SectionLabel>
          <Tabs
            tabs={[
              { value: "design", label: "🎨 Design", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>Clay UI follows a soft neumorphic design language with consistent shadows and depth.</p> },
              { value: "motion", label: "⚡ Motion", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>Spring easing curves, scroll reveals, and microinteractions.</p> },
              { value: "code", label: "🧩 Code", content: <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>61+ components, TypeScript-first, pure inline styles.</p> },
            ]}
          />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Breadcrumb</SectionLabel>
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Components", href: "#" }, { label: "Navigation" }]} />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Browser Tabs</SectionLabel>
          <BrowserTabs
            tabs={btabs.map(t => ({ ...t, closable: true }))}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onTabClose={(id) => setBtabs(prev => prev.filter(t => t.id !== id))}
          />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Pagination</SectionLabel>
          <Pagination totalPages={8} currentPage={3} onPageChange={() => {}} />
        </Card>
      </Col>
      <Col span={12}>
        <Card padding="sm">
          <SectionLabel>Bottom Nav (mobile)</SectionLabel>
          <BottomNav
            items={[
              { label: "Home", icon: "🏠" },
              { label: "Search", icon: "🔍" },
              { label: "Create", icon: "+" },
              { label: "Alerts", icon: "🔔" },
              { label: "Profile", icon: "👤" },
            ]}
          />
        </Card>
      </Col>
    </Grid>
  );
}

function DataSection() {
  return (
    <Grid cols={12} gap={16}>
      <Col span={6}>
        <Card>
          <SectionLabel>Heatmap</SectionLabel>
          <Heatmap data={Array.from({ length: 91 }, () => Math.random())} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Tree View</SectionLabel>
          <TreeView
            nodes={[
              {
                label: "src",
                icon: "📁",
                children: [
                  {
                    label: "components",
                    icon: "📁",
                    children: [
                      { label: "Button.tsx", icon: "📄" },
                      { label: "Card.tsx", icon: "📄" },
                      { label: "Input.tsx", icon: "📄" },
                    ],
                  },
                  {
                    label: "hooks",
                    icon: "📁",
                    children: [
                      { label: "useNeuTheme.ts", icon: "📄" },
                      { label: "useAnimation.ts", icon: "📄" },
                    ],
                  },
                  { label: "index.ts", icon: "📄" },
                ],
              },
              { label: "package.json", icon: "📋" },
              { label: "tsconfig.json", icon: "📋" },
            ]}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <SectionLabel>Accordion</SectionLabel>
          <Accordion
            items={[
              { value: "1", title: "What is NeumorUI?", content: "A neumorphic React component library built with TypeScript and Radix UI. 61 components with dark mode and animations." },
              { value: "2", title: "Is it accessible?", content: "Yes — all components are built on top of Radix primitives with WAI-ARIA support." },
              { value: "3", title: "Can I customize the theme?", content: "Absolutely. Override CSS variables or use the NeuProvider accent prop." },
            ]}
            defaultValue="1"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Activity Feed</SectionLabel>
          <ActivityFeed
            items={[
              { user: "Rukon", action: "pushed to main", time: "2 min ago", color: "var(--neu-accent)" },
              { user: "Amina", action: "merged PR #42", time: "15 min ago", color: "var(--neu-success)" },
              { user: "CI/CD", action: "build failed", time: "32 min ago", color: "var(--neu-danger)" },
              { user: "Karim", action: "opened issue #88", time: "1 hr ago", color: "var(--neu-warning)" },
            ]}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Avatar & Badges</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <Avatar initials="RI" size="lg" status="online" />
            <div>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--neu-text-primary)" }}>Rukon Islam</p>
              <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>UI Designer · Dhaka, BD</p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            <Badge variant="primary">Design</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="danger">Alert</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <SectionLabel>Skeleton</SectionLabel>
          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <Skeleton variant="avatar" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
              <Skeleton variant="text" lines={2} />
            </div>
          </div>
          <Skeleton variant="rect" height={60} />
        </Card>
      </Col>
    </Grid>
  );
}

function FeedbackSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <Grid cols={12} gap={16}>
      <Col span={6}>
        <Card>
          <SectionLabel>Alerts</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Alert variant="info" title="New version available">v2.0 is out with 61 components.</Alert>
            <Alert variant="success" title="Changes saved">All your changes have been saved automatically.</Alert>
            <Alert variant="warning" title="Trial ending soon">Your trial ends in 3 days.</Alert>
            <Alert variant="danger" title="Critical error" onClose={() => {}}>Service is temporarily unavailable.</Alert>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Stepper</SectionLabel>
          <Stepper
            steps={[
              { label: "Order placed", description: "Apr 14, 10:30 AM", status: "done" },
              { label: "Payment confirmed", description: "Apr 14, 10:32 AM", status: "done" },
              { label: "In transit", description: "Expected Apr 16", status: "active" },
              { label: "Delivered", description: "Pending", status: "pending" },
            ]}
          />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Toast</SectionLabel>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={() => toast({ message: "New message from Amina", variant: "default" })}>💬 Message</Button>
            <Button variant="success" onClick={() => toast({ message: "Payment received", description: "$4,200 from Acme Corp", variant: "success" })}>💳 Payment</Button>
            <Button variant="danger" onClick={() => toast({ message: "Server error detected", variant: "danger" })}>⚠️ Alert</Button>
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Loading Overlay</SectionLabel>
          <LoadingOverlay loading={loading} message="Fetching data...">
            <div style={{ padding: "20px", borderRadius: "16px", boxShadow: "var(--neu-shadow-inset)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80px" }}>
              <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", fontWeight: 600 }}>Content loaded ✓</p>
            </div>
          </LoadingOverlay>
          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <Button variant="raised" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>Fetch data</Button>
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <AnnouncementBar variant="gradient" icon="🚀" dismissible>
          NeumorUI v2.0 just launched with 61 components!
        </AnnouncementBar>
      </Col>
      <Col span={12}>
        <Card>
          <SectionLabel>Marquee</SectionLabel>
          <Marquee>
            <span>🚀 NeumorUI v2.0</span>
            <span>✨ 61 Components</span>
            <span>🌙 Dark Mode</span>
            <span>⚡ Animations</span>
            <span>📦 TypeScript</span>
            <span>🎨 Custom Themes</span>
          </Marquee>
        </Card>
      </Col>
    </Grid>
  );
}

function OverlaySection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Grid cols={12} gap={16}>
      <Col span={6}>
        <Card>
          <SectionLabel>Modal & Drawer</SectionLabel>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button variant="raised" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete Account</Button>
          </div>
          <Modal open={modalOpen} onOpenChange={setModalOpen} title="Settings" description="Manage your preferences">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Switch label="Notifications" description="Push alerts" />
              <Switch label="Dark mode" description="Switch theme" checked={true} />
              <Button variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setModalOpen(false)}>Save</Button>
            </div>
          </Modal>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Menu">
            <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", lineHeight: 1.6 }}>
              Drawer content — great for shopping carts, settings, or activity feeds.
            </p>
          </Drawer>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="🗑 Delete account?"
            description="This action is permanent. All your data will be deleted."
            variant="danger"
            confirmLabel="Delete forever"
            onConfirm={() => setConfirmOpen(false)}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Tooltip & Speed Dial</SectionLabel>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
            <Tooltip content="I'm a tooltip!"><Button variant="raised">Hover me</Button></Tooltip>
            <Tooltip content="Another one" side="right"><Button variant="pill">Right tooltip</Button></Tooltip>
          </div>
          <SectionLabel>Spinner</SectionLabel>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" variant="success" />
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <CookieConsent
          title="We use cookies"
          description="We use cookies to improve your experience."
          options={[
            { label: "Essential cookies", required: true, defaultChecked: true },
            { label: "Analytics cookies", defaultChecked: true },
            { label: "Marketing cookies" },
          ]}
        />
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Radio Group</SectionLabel>
          <RadioGroup
            name="plan"
            options={[
              { value: "free", label: "Free", description: "10 components" },
              { value: "pro", label: "Pro", description: "61+ components" },
              { value: "team", label: "Team", description: "Unlimited seats" },
            ]}
            defaultValue="pro"
          />
        </Card>
      </Col>
    </Grid>
  );
}

function LayoutSection() {
  return (
    <Grid cols={12} gap={16}>
      <Col span={12}>
        <Card>
          <SectionLabel>Comparison Table</SectionLabel>
          <ComparisonTable
            features={["Components", "Dark mode", "Storybook", "Custom themes", "Team seats"]}
            plans={[
              { name: "Free", values: ["10", false, false, false, "1"] },
              { name: "Pro", highlight: true, values: ["61+", true, true, true, "1"] },
              { name: "Team", values: ["61+", true, true, true, "∞"] },
            ]}
          />
        </Card>
      </Col>
      <Col span={12}>
        <PricingCard
          plans={[
            {
              name: "Free",
              price: "$0",
              period: "/mo",
              features: [
                { label: "10 components", included: true },
                { label: "Light mode", included: true },
                { label: "Dark mode", included: false },
                { label: "Storybook", included: false },
              ],
              cta: { label: "Start free", variant: "clay" },
            },
            {
              name: "Pro",
              price: "$12",
              period: "/mo",
              highlighted: true,
              badge: "Most popular",
              features: [
                { label: "61+ components", included: true },
                { label: "Dark mode", included: true },
                { label: "Storybook", included: true },
                { label: "Custom themes", included: true },
              ],
              cta: { label: "Get Pro →", variant: "primary" },
            },
            {
              name: "Team",
              price: "$49",
              period: "/mo",
              features: [
                { label: "Everything in Pro", included: true },
                { label: "Unlimited seats", included: true },
                { label: "Priority support", included: true },
                { label: "Private Slack", included: true },
              ],
              cta: { label: "Contact us", variant: "clay" },
            },
          ]}
        />
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Carousel</SectionLabel>
          <Carousel
            slides={[
              { content: <div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "10px" }}>🎨</div><p style={{ fontSize: "14px", fontWeight: 800 }}>Design System</p></div>, background: "linear-gradient(135deg, #c8d0fd, #9aa2fb)" },
              { content: <div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "10px" }}>🌙</div><p style={{ fontSize: "14px", fontWeight: 800 }}>Dark Mode</p></div>, background: "linear-gradient(135deg, #9ee8c0, #6dd4a0)" },
              { content: <div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "10px" }}>⚡</div><p style={{ fontSize: "14px", fontWeight: 800 }}>Animations</p></div>, background: "linear-gradient(135deg, #fde0dc, #f4aaaa)" },
            ]}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <SectionLabel>Toggle Group</SectionLabel>
          <ToggleGroup
            type="single"
            items={[
              { value: "all", label: "All" },
              { value: "design", label: "Design" },
              { value: "dev", label: "Dev" },
              { value: "motion", label: "Motion" },
            ]}
            defaultValue="all"
          />
          <Divider style={{ margin: "20px 0" }} />
          <SectionLabel>Divider</SectionLabel>
          <Divider label="OR" />
        </Card>
      </Col>
    </Grid>
  );
}

function InstallBlock() {
  return (
    <Card variant="inset">
      <pre style={{ overflow: "auto", fontFamily: "monospace", fontSize: "13px", lineHeight: 1.7, color: "var(--neu-text-primary)" }}>
        <code>{`pnpm add neumorui

import { NeuProvider } from "neumorui";
import "neumorui/styles";

<NeuProvider>
  <App />
</NeuProvider>`}</code>
      </pre>
    </Card>
  );
}
