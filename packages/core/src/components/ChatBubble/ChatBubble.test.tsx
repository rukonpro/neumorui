import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders message", () => {
    render(<ChatBubble message="Hello!" />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders name for received messages", () => {
    render(<ChatBubble message="Hi" variant="received" name="Sarah" />);
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });

  it("renders timestamp", () => {
    render(<ChatBubble message="Test" time="10:30 AM" />);
    expect(screen.getByText("10:30 AM")).toBeInTheDocument();
  });
});
