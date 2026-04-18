import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeCustomizer } from "./ThemeCustomizer";

describe("ThemeCustomizer", () => {
  it("renders the toggle button", () => {
    render(<ThemeCustomizer />);
    expect(screen.getByRole("button", { name: "Customize theme" })).toBeInTheDocument();
  });

  it("opens the panel on click", () => {
    render(<ThemeCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: "Customize theme" }));
    expect(screen.getByText("Theme Customizer")).toBeInTheDocument();
  });

  it("shows preset buttons when panel is open", () => {
    render(<ThemeCustomizer />);
    fireEvent.click(screen.getByRole("button", { name: "Customize theme" }));
    expect(screen.getByText("Presets")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Violet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Blue" })).toBeInTheDocument();
  });

  it("shows the panel when open prop is true", () => {
    render(<ThemeCustomizer open />);
    expect(screen.getByText("Theme Customizer")).toBeInTheDocument();
  });
});
