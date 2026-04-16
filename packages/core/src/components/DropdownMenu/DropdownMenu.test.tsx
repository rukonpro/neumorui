import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DropdownMenu } from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("renders the trigger", () => {
    render(
      <DropdownMenu
        trigger={<button>Menu</button>}
        items={[{ label: "Item 1" }, { label: "Item 2" }]}
      />
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders without crashing when items include separator and label types", () => {
    render(
      <DropdownMenu
        trigger={<button>Menu</button>}
        items={[
          { type: "label", label: "Section" },
          { label: "Item A" },
          { type: "separator" },
          { label: "Item B" },
        ]}
      />
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});
