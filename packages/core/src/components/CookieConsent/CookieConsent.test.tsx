import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
  it("renders title and description", () => {
    render(<CookieConsent title="Cookies" description="We use cookies." />);
    expect(screen.getByText("Cookies")).toBeInTheDocument();
    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
  });

  it("calls onAccept with all options when Accept All is clicked", () => {
    const handleAccept = vi.fn();
    render(
      <CookieConsent
        options={[
          { label: "Essential", required: true },
          { label: "Analytics" },
        ]}
        onAccept={handleAccept}
      />
    );
    fireEvent.click(screen.getByText("Accept All"));
    expect(handleAccept).toHaveBeenCalledWith(["Essential", "Analytics"]);
  });

  it("renders toggle switches for each option", () => {
    render(
      <CookieConsent
        options={[
          { label: "Essential", required: true, defaultChecked: true },
          { label: "Marketing" },
        ]}
      />
    );
    expect(screen.getByText("Essential")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    const toggles = screen.getAllByRole("switch");
    expect(toggles.length).toBe(2);
  });
});
