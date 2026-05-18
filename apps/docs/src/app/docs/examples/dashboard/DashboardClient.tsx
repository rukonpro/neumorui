"use client";

import {
  Card,
  StatsCard,
  AreaChart,
  DonutChart,
  BarChart,
  Avatar,
  Badge,
  Button,
} from "neumorui";

const heading: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--neu-text-secondary)",
  margin: "0 0 14px",
};

const revenueSeries = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 51 },
  { label: "Apr", value: 49 },
  { label: "May", value: 64 },
  { label: "Jun", value: 72 },
  { label: "Jul", value: 81 },
  { label: "Aug", value: 78 },
  { label: "Sep", value: 94 },
];

const trafficSegments = [
  { label: "Direct", value: 42, color: "var(--neu-accent)" },
  { label: "Social", value: 28, color: "var(--neu-success)" },
  { label: "Email", value: 18, color: "var(--neu-warning)" },
  { label: "Referral", value: 12, color: "var(--neu-danger)" },
];

const salesByCategory = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 73 },
  { label: "Sun", value: 56 },
];

const recentActivity = [
  { name: "Anwar Hossain", initials: "AH", action: "purchased Pro plan", amount: "$49", time: "2m ago", status: "success" as const },
  { name: "Mei Tanaka", initials: "MT", action: "started free trial", amount: "—", time: "8m ago", status: "info" as const },
  { name: "Carlos Vega", initials: "CV", action: "renewed Team plan", amount: "$129", time: "23m ago", status: "success" as const },
  { name: "Priya Iyer", initials: "PI", action: "requested refund", amount: "−$29", time: "1h ago", status: "danger" as const },
  { name: "Jonas Berg", initials: "JB", action: "upgraded to Enterprise", amount: "$499", time: "2h ago", status: "success" as const },
];

const badgeVariant: Record<string, "success" | "danger" | "info"> = {
  success: "success",
  danger: "danger",
  info: "info",
};

export default function DashboardClient() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "var(--neu-text-primary)",
              letterSpacing: "-0.02em",
              margin: "0 0 4px",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)", margin: 0 }}>
            Overview of your store — last 30 days
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="flat">Last 30 days ↓</Button>
          <Button variant="primary">Export</Button>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
        }}
      >
        <StatsCard label="Revenue" value="$84,320" trend={{ value: "+12.4%", direction: "up" }} color="var(--neu-accent)" />
        <StatsCard label="Customers" value="2,847" trend={{ value: "+8.1%", direction: "up" }} color="var(--neu-success)" />
        <StatsCard label="Orders" value="1,294" trend={{ value: "+3.2%", direction: "up" }} color="var(--neu-warning)" />
        <StatsCard label="Refund Rate" value="1.8%" trend={{ value: "−0.6%", direction: "down" }} color="var(--neu-danger)" />
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "14px",
        }}
        className="dashboard-charts-row"
      >
        <Card>
          <h2 style={heading}>Revenue Trend</h2>
          <AreaChart data={revenueSeries} height={220} color="var(--neu-accent)" showGrid showLabels />
        </Card>

        <Card>
          <h2 style={heading}>Traffic Sources</h2>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
            <DonutChart segments={trafficSegments} size={180} centerLabel="Visits" centerValue="12.4k" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
            {trafficSegments.map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--neu-text-secondary)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: s.color, display: "inline-block" }} />
                  {s.label}
                </span>
                <span style={{ fontWeight: 700, color: "var(--neu-text-primary)" }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sales + Activity row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "14px",
        }}
        className="dashboard-bottom-row"
      >
        <Card>
          <h2 style={heading}>Sales by Day</h2>
          <BarChart data={salesByCategory} height={200} />
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 style={{ ...heading, margin: 0 }}>Recent Activity</h2>
            <Button variant="pill">View all</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recentActivity.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px",
                  borderRadius: "12px",
                  boxShadow: "var(--neu-shadow-inset-sm)",
                }}
              >
                <Avatar initials={item.initials} size="md" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--neu-text-muted)", marginTop: "1px" }}>
                    {item.action} • {item.time}
                  </div>
                </div>
                <Badge variant={badgeVariant[item.status]}>{item.amount}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Responsive — stack columns on small screens */}
      <style>{`
        @media (max-width: 900px) {
          .dashboard-charts-row,
          .dashboard-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
