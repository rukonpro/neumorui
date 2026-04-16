import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("renders default label", () => {
    render(<FileUpload />);
    expect(
      screen.getByText("Drop files here or click to browse")
    ).toBeInTheDocument();
  });

  it("renders custom label and hint", () => {
    render(<FileUpload label="Upload now" hint="Max 2MB" />);
    expect(screen.getByText("Upload now")).toBeInTheDocument();
    expect(screen.getByText("Max 2MB")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<FileUpload disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
