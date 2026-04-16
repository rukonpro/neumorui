import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} total={10} onChange={setPage} />;
  },
};

export const Large: Story = {
  render: () => {
    const [page, setPage] = useState(8);
    return <Pagination page={page} total={20} onChange={setPage} />;
  },
};
