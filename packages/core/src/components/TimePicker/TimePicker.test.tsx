import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimePicker } from "./TimePicker";

describe("TimePicker", () => {
  it("renders the label", () => {
    render(<TimePicker label="Start Time" />);
    expect(screen.getByText("Start Time")).toBeInTheDocument();
  });

  it("opens the time panel on click", () => {
    render(<TimePicker />);
    fireEvent.click(screen.getByText("Select time"));
    // The colon separator between hour and minute should appear
    expect(screen.getByText(":")).toBeInTheDocument();
  });

  it("shows hour and minute spinners when open", () => {
    render(<TimePicker />);
    fireEvent.click(screen.getByText("Select time"));
    // Default hour is 09, minute is 00
    expect(screen.getByText("09")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });

  it("renders placeholder when no value is set", () => {
    render(<TimePicker placeholder="Choose time" />);
    expect(screen.getByText("Choose time")).toBeInTheDocument();
  });
});
