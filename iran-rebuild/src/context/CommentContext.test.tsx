import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentProvider, useComments } from "./CommentContext";

function TestConsumer() {
  const { comments, addComment } = useComments();
  return (
    <div>
      <span data-testid="count">{comments.length}</span>
      <span data-testid="last-text">{comments[comments.length - 1]?.text}</span>
      <button onClick={() => addComment({
        projectId: "p1", parentId: null,
        authorName: "Test", authorEmail: "test@test.com", text: "Hello",
      })}>add</button>
    </div>
  );
}

describe("CommentContext", () => {
  it("starts with empty comments", () => {
    render(<CommentProvider><TestConsumer /></CommentProvider>);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("adds a comment", async () => {
    const user = userEvent.setup();
    render(<CommentProvider><TestConsumer /></CommentProvider>);
    await user.click(screen.getByText("add"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("last-text")).toHaveTextContent("Hello");
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow("useComments must be used within CommentProvider");
  });
});
