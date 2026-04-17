import type { Meta, StoryObj } from "@storybook/react";
import { Grid, Col } from "./Grid";
import { Card } from "../Card/Card";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Box = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "14px",
      background: color || "var(--neu-tint-primary)",
      color: "var(--neu-tint-primary-text)",
      fontSize: "13px",
      fontWeight: 700,
      textAlign: "center",
      boxShadow: "var(--neu-shadow-raised-sm)",
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
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

export const AutoFit: Story = {
  render: () => (
    <Grid minChildWidth="200px" gap={16}>
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
      <Card>Card 4</Card>
    </Grid>
  ),
};

export const ColSpan: Story = {
  render: () => (
    <Grid cols={12} gap={16}>
      <Col span={7}>
        <Card>Main content (span 7)</Card>
      </Col>
      <Col span={5}>
        <Card>Sidebar (span 5)</Card>
      </Col>
      <Col span={4}>
        <Box>4 cols</Box>
      </Col>
      <Col span={4}>
        <Box color="var(--neu-tint-success)">4 cols</Box>
      </Col>
      <Col span={4}>
        <Box color="var(--neu-tint-danger)">4 cols</Box>
      </Col>
      <Col span={12}>
        <Card variant="inset">Full width (span 12)</Card>
      </Col>
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
