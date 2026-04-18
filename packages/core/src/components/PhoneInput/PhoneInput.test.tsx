import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PhoneInput } from "./PhoneInput";

describe("PhoneInput", () => {
  it("renders with label", () => {
    render(<PhoneInput label="Phone" />);
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  it("shows default country flag and dial code", () => {
    render(<PhoneInput defaultCountry="BD" />);
    expect(screen.getByText("+880")).toBeInTheDocument();
  });

  it("opens country dropdown on click", () => {
    render(<PhoneInput />);
    fireEvent.click(screen.getByText("+880"));
    expect(screen.getByPlaceholderText("Search country...")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<PhoneInput error="Invalid number" />);
    expect(screen.getByText("Invalid number")).toBeInTheDocument();
  });
});
