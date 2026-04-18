import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AudioPlayer } from "./AudioPlayer";

describe("AudioPlayer", () => {
  it("renders audio element", () => {
    const { container } = render(<AudioPlayer src="/test.mp3" />);
    expect(container.querySelector("audio")).toBeInTheDocument();
  });

  it("renders play button", () => {
    render(<AudioPlayer src="/test.mp3" />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
  });

  it("renders title and artist", () => {
    render(<AudioPlayer src="/test.mp3" title="Song" artist="Artist" />);
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });
});
