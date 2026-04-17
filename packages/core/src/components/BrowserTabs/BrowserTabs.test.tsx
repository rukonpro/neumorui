import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserTabs } from "./BrowserTabs";

const tabs = [
  { id: "home", label: "Home" },
  { id: "components", label: "Components", badge: 12 },
  { id: "themes", label: "Themes" },
];

describe("BrowserTabs", () => {
  it("renders all tabs", () => {
    render(<BrowserTabs tabs={tabs} />);
    expect(screen.getByTestId("tab-home")).toBeInTheDocument();
    expect(screen.getByTestId("tab-components")).toBeInTheDocument();
    expect(screen.getByTestId("tab-themes")).toBeInTheDocument();
  });

  it("renders tab labels", () => {
    render(<BrowserTabs tabs={tabs} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("renders badge", () => {
    render(<BrowserTabs tabs={tabs} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("calls onTabChange on click", () => {
    const onChange = vi.fn();
    render(<BrowserTabs tabs={tabs} onTabChange={onChange} />);
    fireEvent.click(screen.getByTestId("tab-components"));
    expect(onChange).toHaveBeenCalledWith("components");
  });

  it("calls onTabClose on close click", () => {
    const onClose = vi.fn();
    render(<BrowserTabs tabs={tabs} onTabClose={onClose} />);
    fireEvent.click(screen.getByTestId("tab-close-home"));
    expect(onClose).toHaveBeenCalledWith("home");
  });

  it("renders add button when onTabAdd provided", () => {
    const onAdd = vi.fn();
    render(<BrowserTabs tabs={tabs} onTabAdd={onAdd} />);
    const addBtn = screen.getByTestId("tab-add-btn");
    fireEvent.click(addBtn);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
