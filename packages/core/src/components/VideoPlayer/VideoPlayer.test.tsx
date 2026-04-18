import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders video element", () => {
    const { container } = render(<VideoPlayer src="/test.mp4" />);
    expect(container.querySelector("video")).toBeInTheDocument();
  });

  it("sets video src", () => {
    const { container } = render(<VideoPlayer src="/demo.mp4" />);
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.getAttribute("src")).toBe("/demo.mp4");
  });

  it("renders play overlay when not playing", () => {
    const { container } = render(<VideoPlayer src="/test.mp4" />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });
});
