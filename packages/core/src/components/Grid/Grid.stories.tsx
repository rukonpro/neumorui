import type { Meta, StoryObj } from "@storybook/react";
import { Grid, Col } from "./Grid";
import { Card } from "../Card/Card";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Box = ({ children, color, h }: { children: React.ReactNode; color?: string; h?: string }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "14px",
      background: color || "var(--neu-tint-primary)",
      color: color ? "var(--neu-text-primary)" : "var(--neu-tint-primary-text)",
      fontSize: "13px",
      fontWeight: 700,
      textAlign: "center",
      boxShadow: "var(--neu-shadow-raised-sm)",
      height: h,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

export const BasicGrid: Story = {
  name: "Basic 3-Column",
  render: () => (
    <Grid cols={3} gap={16}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Grid>
  ),
};

export const CustomGap: Story = {
  name: "Custom Gap (row vs col)",
  render: () => (
    <Grid cols={4} rowGap={24} colGap={8}>
      <Box>rowGap: 24</Box>
      <Box>colGap: 8</Box>
      <Box>rowGap: 24</Box>
      <Box>colGap: 8</Box>
      <Box>row 2</Box>
      <Box>row 2</Box>
      <Box>row 2</Box>
      <Box>row 2</Box>
    </Grid>
  ),
};

export const AutoFitResponsive: Story = {
  name: "Auto-Fit Responsive",
  render: () => (
    <Grid minChildWidth="200px" gap={16}>
      <Card>Auto 1</Card>
      <Card>Auto 2</Card>
      <Card>Auto 3</Card>
      <Card>Auto 4</Card>
      <Card>Auto 5</Card>
    </Grid>
  ),
};

export const ColSpanLayout: Story = {
  name: "12-Column Span",
  render: () => (
    <Grid cols={12} gap={16}>
      <Col span={8}>
        <Box color="var(--neu-tint-primary)">span 8</Box>
      </Col>
      <Col span={4}>
        <Box color="var(--neu-tint-success)">span 4</Box>
      </Col>
      <Col span={3}>
        <Box color="var(--neu-tint-danger)">3</Box>
      </Col>
      <Col span={3}>
        <Box color="var(--neu-tint-warning)">3</Box>
      </Col>
      <Col span={3}>
        <Box color="var(--neu-tint-info)">3</Box>
      </Col>
      <Col span={3}>
        <Box color="var(--neu-tint-primary)">3</Box>
      </Col>
      <Col span={12}>
        <Box>Full width — span 12</Box>
      </Col>
    </Grid>
  ),
};

export const RowSpan: Story = {
  name: "Row Span",
  render: () => (
    <Grid cols={3} gap={16} autoRows="80px">
      <Col rowSpan={2}>
        <Box color="var(--neu-tint-primary)" h="100%">Row span 2</Box>
      </Col>
      <Box>A</Box>
      <Box>B</Box>
      <Box>C</Box>
      <Box>D</Box>
    </Grid>
  ),
};

export const Alignment: Story = {
  name: "Align & Justify",
  render: () => (
    <Grid cols={3} gap={16} alignItems="center" justifyItems="center" style={{ minHeight: "200px" }}>
      <Box h="40px">Short</Box>
      <Box h="100px">Tall</Box>
      <Box h="60px">Medium</Box>
    </Grid>
  ),
};

export const ColAlignment: Story = {
  name: "Col Self-Alignment",
  render: () => (
    <Grid cols={3} gap={16} style={{ minHeight: "200px" }}>
      <Col alignSelf="start">
        <Box>align: start</Box>
      </Col>
      <Col alignSelf="center">
        <Box color="var(--neu-tint-success)">align: center</Box>
      </Col>
      <Col alignSelf="end">
        <Box color="var(--neu-tint-danger)">align: end</Box>
      </Col>
    </Grid>
  ),
};

export const ColOrder: Story = {
  name: "Col Order",
  render: () => (
    <Grid cols={3} gap={16}>
      <Col order={3}><Box color="var(--neu-tint-danger)">Order 3 (1st in DOM)</Box></Col>
      <Col order={1}><Box color="var(--neu-tint-success)">Order 1 (2nd in DOM)</Box></Col>
      <Col order={2}><Box color="var(--neu-tint-primary)">Order 2 (3rd in DOM)</Box></Col>
    </Grid>
  ),
};

export const GridAreas: Story = {
  name: "Grid Areas",
  render: () => (
    <Grid
      templateColumns="1fr 1fr 1fr"
      templateRows="auto auto"
      areas={`"header header header" "sidebar main main"`}
      gap={16}
    >
      <Col area="header"><Box>Header</Box></Col>
      <Col area="sidebar"><Box color="var(--neu-tint-success)" h="120px">Sidebar</Box></Col>
      <Col area="main"><Box color="var(--neu-tint-primary)" h="120px">Main Content</Box></Col>
    </Grid>
  ),
};

export const DenseFlow: Story = {
  name: "Dense Auto-Flow",
  render: () => (
    <Grid cols={3} gap={12} flow="row dense" autoRows="60px">
      <Col span={2}><Box color="var(--neu-tint-primary)">Span 2</Box></Col>
      <Box>A</Box>
      <Box>B</Box>
      <Col span={2}><Box color="var(--neu-tint-success)">Span 2</Box></Col>
      <Box>C</Box>
      <Box>D</Box>
    </Grid>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Grid cols={12} gap={16}>
      <Col span={8}>
        <Card style={{ minHeight: "200px" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--neu-text-muted)", marginBottom: "12px" }}>Chart</p>
          <p style={{ fontSize: "13px", color: "var(--neu-text-secondary)" }}>Main chart area</p>
        </Card>
      </Col>
      <Col span={4}>
        <Grid cols={1} gap={16}>
          <Card>
            <p style={{ fontSize: "2rem", fontWeight: 900, color: "var(--neu-accent)" }}>$48k</p>
            <p style={{ fontSize: "11px", color: "var(--neu-text-secondary)" }}>Revenue</p>
          </Card>
          <Card>
            <p style={{ fontSize: "2rem", fontWeight: 900, color: "var(--neu-success)" }}>9.2k</p>
            <p style={{ fontSize: "11px", color: "var(--neu-text-secondary)" }}>Users</p>
          </Card>
        </Grid>
      </Col>
      <Col span={4}><Card>Widget 1</Card></Col>
      <Col span={4}><Card>Widget 2</Card></Col>
      <Col span={4}><Card>Widget 3</Card></Col>
    </Grid>
  ),
};
