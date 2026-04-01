import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import CommentThread from "./CommentThread";

describe("CommentThread", () => {
  it("renders discussion heading with zero count", () => {
    renderWithProviders(<CommentThread projectId="test-1" />);
    expect(screen.getByText("Discussion (0)")).toBeInTheDocument();
  });

  it("shows sign in button when not authenticated", () => {
    renderWithProviders(<CommentThread projectId="test-1" />);
    expect(screen.getByText("Sign in with Google to comment")).toBeInTheDocument();
  });

  it("shows comment form after signing in", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentThread projectId="test-1" />);
    await user.click(screen.getByText("Sign in with Google to comment"));
    expect(screen.getByPlaceholderText("Join the discussion...")).toBeInTheDocument();
    expect(screen.getByText("Post Comment")).toBeInTheDocument();
  });

  it("disables post button when textarea is empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentThread projectId="test-1" />);
    await user.click(screen.getByText("Sign in with Google to comment"));
    expect(screen.getByText("Post Comment")).toBeDisabled();
  });

  it("enables post button when text is entered", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentThread projectId="test-1" />);
    await user.click(screen.getByText("Sign in with Google to comment"));
    await user.type(screen.getByPlaceholderText("Join the discussion..."), "Hello");
    expect(screen.getByText("Post Comment")).toBeEnabled();
  });

  it("posts a comment and clears textarea", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentThread projectId="test-1" />);
    await user.click(screen.getByText("Sign in with Google to comment"));
    await user.type(screen.getByPlaceholderText("Join the discussion..."), "My comment");
    await user.click(screen.getByText("Post Comment"));
    expect(screen.getByText("My comment")).toBeInTheDocument();
    expect(screen.getByText("Discussion (1)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Join the discussion...")).toHaveValue("");
  });
});
