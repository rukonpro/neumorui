import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastProvider, useToast } from "./Toast";

const Trigger = () => {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ message: "Saved!", description: "Details" })}>
      fire
    </button>
  );
};

describe("Toast", () => {
  it("renders children of provider", () => {
    render(
      <ToastProvider>
        <span>child</span>
      </ToastProvider>
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("displays a toast message when useToast is invoked", () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("fire"));
    expect(screen.getByText("Saved!")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});
