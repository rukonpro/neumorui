import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MessageList } from "./MessageList";

const messages = [
  { id: "1", role: "user" as const, content: "Hello!" },
  { id: "2", role: "assistant" as const, content: "Hi there!", name: "AI" },
];

describe("MessageList", () => {
  it("renders messages", () => {
    render(<MessageList messages={messages} />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("shows empty state when no messages", () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });

  it("shows custom empty state", () => {
    render(<MessageList messages={[]} emptyState={<p>Start chatting!</p>} />);
    expect(screen.getByText("Start chatting!")).toBeInTheDocument();
  });

  it("renders with role log", () => {
    render(<MessageList messages={messages} />);
    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("renders system messages centered", () => {
    render(<MessageList messages={[{ id: "1", role: "system", content: "System notice" }]} />);
    expect(screen.getByText("System notice")).toBeInTheDocument();
  });
});
