import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Carousel } from "./Carousel";

const slides = [
  { content: <span>First</span> },
  { content: <span>Second</span> },
  { content: <span>Third</span> },
];

describe("Carousel", () => {
  it("renders all slides", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("navigates to next slide on next button click", () => {
    render(<Carousel slides={slides} />);
    const track = screen.getByTestId("carousel-track");
    expect(track.style.transform).toBe("translateX(-0%)");
    fireEvent.click(screen.getByLabelText("Next slide"));
    expect(track.style.transform).toBe("translateX(-100%)");
  });

  it("renders dot indicators for each slide", () => {
    render(<Carousel slides={slides} />);
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots.length).toBe(3);
  });
});
