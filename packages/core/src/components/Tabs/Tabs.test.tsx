import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tabs } from "./Tabs";

const tabs = [
  { value: "one", label: "One", content: <p>First content</p> },
  { value: "two", label: "Two", content: <p>Second content</p> },
];

describe("Tabs", () => {
  it("renders tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    render(<Tabs tabs={tabs} defaultValue="one" />);
    expect(screen.getByText("First content")).toBeInTheDocument();
  });

  it("renders with different default value", () => {
    render(<Tabs tabs={tabs} defaultValue="two" />);
    expect(screen.getByText("Second content")).toBeInTheDocument();
  });
});
