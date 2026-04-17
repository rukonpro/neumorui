import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MegaMenu } from "./MegaMenu";

const items = [
  { label: "Products", panel: <div>Products panel</div> },
  { label: "Resources", panel: <div>Resources panel</div> },
];

describe("MegaMenu", () => {
  it("renders trigger labels", () => {
    render(<MegaMenu items={items} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("shows panel on hover", () => {
    render(<MegaMenu items={items} />);
    expect(screen.queryByText("Products panel")).not.toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByText("Products").parentElement!);
    expect(screen.getByText("Products panel")).toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<MegaMenu items={items} />);
    const trigger = screen.getByText("Products");
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
  });
});
