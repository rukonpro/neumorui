import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MusicPlayerCard } from "./MusicPlayerCard";

describe("MusicPlayerCard", () => {
  it("renders title and artist", () => {
    render(<MusicPlayerCard title="Song" artist="Band" />);
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByText("Band")).toBeInTheDocument();
  });

  it("renders progress times", () => {
    render(<MusicPlayerCard title="X" artist="Y" currentTime="1:30" duration="3:45" />);
    expect(screen.getByText("1:30")).toBeInTheDocument();
    expect(screen.getByText("3:45")).toBeInTheDocument();
  });

  it("renders play/pause controls", () => {
    render(<MusicPlayerCard title="X" artist="Y" />);
    // Play button + prev + next + shuffle + repeat = 5 buttons + like = 6
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(5);
  });
});
