import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";

const meta: Meta = {
  title: "Components/DataTable",
};

export default meta;

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "banned";
  createdAt: string;
};

const data: User[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: [
    "Aarav Khan",
    "Priya Das",
    "Rahim Uddin",
    "Sunita Roy",
    "Farhan Ali",
    "Nabila Sultana",
    "Tanvir Hasan",
    "Mehzabin Chowdhury",
  ][i % 8],
  email: `user${i + 1}@example.com`,
  role: (["admin", "editor", "viewer"] as const)[i % 3],
  status: (["active", "pending", "banned"] as const)[i % 3],
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(),
}));

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar size="sm" initials={row.original.name.slice(0, 2)} />
        <div>
          <div style={{ fontWeight: 500 }}>{row.original.name}</div>
          <div style={{ fontSize: 11, color: "var(--neu-text-muted)" }}>
            {row.original.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <Badge variant="primary">{getValue() as string}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const s = getValue() as User["status"];
      const variant =
        s === "active" ? "success" : s === "pending" ? "warning" : "danger";
      return (
        <Badge variant={variant} dot>
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ getValue }) => (
      <span style={{ color: "var(--neu-text-secondary)" }}>
        {getValue() as string}
      </span>
    ),
  },
];

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 780 }}>
      <DataTable columns={columns} data={data} pageSize={6} />
    </div>
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <div style={{ width: 780 }}>
      <DataTable columns={columns} data={[]} />
    </div>
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <div style={{ width: 780 }}>
      <DataTable columns={columns} data={[]} loading />
    </div>
  ),
};
