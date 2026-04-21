import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
  it("renders textarea with placeholder", () => {
    render(<ChatInput placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("calls onSend on Enter key", () => {
    const onSend = vi.fn();
    render(<ChatInput value="Hello" onSend={onSend} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith("Hello");
  });

  it("does not send on Shift+Enter", () => {
    const onSend = vi.fn();
    render(<ChatInput value="Hello" onSend={onSend} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("disables send when empty", () => {
    render(<ChatInput value="" />);
    expect(screen.getByLabelText("Send message")).toBeDisabled();
  });

  it("shows character count when maxLength set", () => {
    render(<ChatInput value="Hi" maxLength={100} />);
    expect(screen.getByText("2/100")).toBeInTheDocument();
  });
});
