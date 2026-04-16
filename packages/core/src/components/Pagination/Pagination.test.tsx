import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders page buttons", () => {
    render(<Pagination page={1} total={3} onChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onChange when page button clicked", () => {
    const onChange = vi.fn();
    render(<Pagination page={1} total={3} onChange={onChange} />);
    fireEvent.click(screen.getByText("2"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("disables previous on first page", () => {
    render(<Pagination page={1} total={3} onChange={() => {}} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next on last page", () => {
    render(<Pagination page={3} total={3} onChange={() => {}} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });
});
