import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Grid, Col } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    render(<Grid><div>Item 1</div><div>Item 2</div></Grid>);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies grid display", () => {
    const { container } = render(<Grid cols={3}><div>x</div></Grid>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.display).toBe("grid");
    expect(el.style.gridTemplateColumns).toBe("repeat(3, 1fr)");
  });

  it("auto-fit with minChildWidth", () => {
    const { container } = render(<Grid minChildWidth="200px"><div>x</div></Grid>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toContain("auto-fit");
  });
});

describe("Col", () => {
  it("applies span", () => {
    const { container } = render(<Col span={6}>Content</Col>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.gridColumn).toBe("span 6");
  });
});
