import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";
import { Pagination } from "../Pagination/Pagination";
import { Spinner } from "../Spinner/Spinner";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  loading?: boolean;
  empty?: React.ReactNode;
  pageSize?: number;
  showPagination?: boolean;
  onRowClick?: (row: TData) => void;
  className?: string;
  style?: React.CSSProperties;
}

const SortIcon = ({ dir }: { dir: false | "asc" | "desc" }) => (
  <svg width="10" height="12" viewBox="0 0 10 12" className="shrink-0">
    <path
      d="M5 1l3 3H2l3-3z"
      fill="currentColor"
      opacity={dir === "asc" ? 1 : 0.3}
    />
    <path
      d="M5 11l-3-3h6l-3 3z"
      fill="currentColor"
      opacity={dir === "desc" ? 1 : 0.3}
    />
  </svg>
);

export function DataTable<TData>({
  columns,
  data,
  loading = false,
  empty = "No data available",
  pageSize = 10,
  showPagination = true,
  onRowClick,
  className,
  style,
  ...rest
}: DataTableProps<TData> & React.HTMLAttributes<HTMLDivElement>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined,
    manualPagination: false,
  });

  const totalPages = table.getPageCount();
  const rows = table.getRowModel().rows;

  return (
    <div className={cn("w-full flex flex-col gap-4", className)} style={style} {...rest}>
      <div
        className="w-full overflow-hidden"
        style={{
          background: "var(--neu-bg)",
          borderRadius: "var(--neu-radius-lg)",
          boxShadow: "var(--neu-shadow-raised)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  style={{ borderBottom: "1px solid var(--neu-border)" }}
                >
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDir = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest",
                          canSort && "cursor-pointer select-none"
                        )}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        style={{ color: "var(--neu-text-secondary)" }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && <SortIcon dir={sortDir} />}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={columns.length} className="p-10 text-center">
                    <div className="inline-flex flex-col items-center gap-2">
                      <Spinner />
                      <span
                        className="text-xs"
                        style={{ color: "var(--neu-text-muted)" }}
                      >
                        Loading…
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-10 text-center text-sm"
                    style={{ color: "var(--neu-text-muted)" }}
                  >
                    {empty}
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(
                      "neu-transition",
                      onRowClick && "cursor-pointer hover:shadow-neu-inset-sm"
                    )}
                    style={{
                      borderBottom: "1px solid var(--neu-border)",
                      color: "var(--neu-text-primary)",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
            Page {pageIndex + 1} of {totalPages} · {data.length} total
          </span>
          <Pagination
            page={pageIndex + 1}
            total={totalPages}
            onChange={(p) => setPageIndex(p - 1)}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
DataTable.displayName = "DataTable";
