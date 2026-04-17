import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingOverlay } from "./LoadingOverlay";

describe("LoadingOverlay", () => {
  it("renders children", () => {
    render(
      <LoadingOverlay loading={false}>
        <p>Content</p>
      </LoadingOverlay>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("shows overlay when loading", () => {
    render(
      <LoadingOverlay loading={true} message="Loading...">
        <p>Content</p>
      </LoadingOverlay>
    );
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("hides overlay when not loading", () => {
    render(
      <LoadingOverlay loading={false} message="Loading...">
        <p>Content</p>
      </LoadingOverlay>
    );
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
  });

  it("renders children even when loading", () => {
    render(
      <LoadingOverlay loading={true}>
        <p>Content</p>
      </LoadingOverlay>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
