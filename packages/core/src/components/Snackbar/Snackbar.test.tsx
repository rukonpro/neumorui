import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SnackbarProvider, useSnackbar } from "./Snackbar";

function TestComponent() {
  const { snackbar } = useSnackbar();
  return <button onClick={() => snackbar({ message: "Hello!" })}>Show</button>;
}

describe("Snackbar", () => {
  it("shows snackbar message on trigger", () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );
    fireEvent.click(screen.getByText("Show"));
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders provider without error", () => {
    render(
      <SnackbarProvider>
        <div>App</div>
      </SnackbarProvider>
    );
    expect(screen.getByText("App")).toBeInTheDocument();
  });
});
