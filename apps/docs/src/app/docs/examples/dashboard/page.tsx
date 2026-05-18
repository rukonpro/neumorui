import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export const metadata: Metadata = {
  title: "Dashboard Example — NeumorUI",
  description: "A complete neumorphic dashboard built with NeumorUI — stats cards, revenue chart, traffic donut, and a sales bar chart. Copy-pasteable.",
  alternates: { canonical: `${SITE_URL}/docs/examples/dashboard` },
  openGraph: {
    title: "Dashboard Example — NeumorUI",
    description: "Stats + charts + activity feed composed with NeumorUI.",
    url: `${SITE_URL}/docs/examples/dashboard`,
    type: "article",
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
