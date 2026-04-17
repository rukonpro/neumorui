import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  const links = [
    { label: "Home", href: "/", active: true },
    { label: "About", href: "/about" },
  ];

  it("renders brand and links", () => {
    render(<Navbar brand="TestBrand" links={links} />);
    expect(screen.getByText("TestBrand")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders navigation role", () => {
    render(<Navbar links={links} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(
      <Navbar links={links} actions={<button>Login</button>} />
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
