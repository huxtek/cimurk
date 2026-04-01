import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import CommentItem from "./CommentItem";
import type { Comment } from "../../types";

const mockComment: Comment = {
  id: "c1",
  projectId: "p1",
  parentId: null,
  authorName: "Jane Doe",
  authorEmail: "jane@example.com",
  text: "This is a great project!",
  createdAt: new Date().toISOString(),
};

const mockReply: Comment = {
  id: "c2",
  projectId: "p1",
  parentId: "c1",
  authorName: "John Smith",
  authorEmail: "john@example.com",
  text: "I agree!",
  createdAt: new Date().toISOString(),
};

describe("CommentItem", () => {
  it("renders comment text and author", () => {
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    expect(screen.getByText("This is a great project!")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders time ago", () => {
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    expect(screen.getByText("just now")).toBeInTheDocument();
  });

  it("shows sign in to reply when not authenticated", () => {
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    expect(screen.getByText("Sign in to reply")).toBeInTheDocument();
  });

  it("renders nested replies", () => {
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment, mockReply]} projectId="p1" depth={0} />
    );
    expect(screen.getByText("I agree!")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("applies nested class at depth > 0", () => {
    const { container } = renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={1} />
    );
    expect(container.firstChild).toHaveClass("nested");
  });

  it("does not apply nested class at depth 0", () => {
    const { container } = renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    expect(container.firstChild).not.toHaveClass("nested");
  });

  it("shows reply form when Reply is clicked after sign in", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    // Sign in first
    await user.click(screen.getByText("Sign in to reply"));
    // Now Reply button should appear
    await user.click(screen.getByText("Reply"));
    expect(screen.getByPlaceholderText("Reply to Jane Doe...")).toBeInTheDocument();
  });

  it("hides reply form when Cancel is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    await user.click(screen.getByText("Sign in to reply"));
    await user.click(screen.getByText("Reply"));
    await user.click(screen.getByText("Cancel"));
    expect(screen.queryByPlaceholderText("Reply to Jane Doe...")).not.toBeInTheDocument();
  });
});

describe("CommentItem - reply submission", () => {
  it("submits a reply and closes the form", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    // Sign in
    await user.click(screen.getByText("Sign in to reply"));
    // Open reply form
    await user.click(screen.getByText("Reply"));
    // Type and submit
    await user.type(screen.getByPlaceholderText("Reply to Jane Doe..."), "Nice reply");
    await user.click(screen.getByText("Reply", { selector: ".btn" }));
    // Form should close
    expect(screen.queryByPlaceholderText("Reply to Jane Doe...")).not.toBeInTheDocument();
  });

  it("does not submit empty reply", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <CommentItem comment={mockComment} allComments={[mockComment]} projectId="p1" depth={0} />
    );
    await user.click(screen.getByText("Sign in to reply"));
    await user.click(screen.getByText("Reply"));
    // Click reply button without typing
    expect(screen.getByText("Reply", { selector: ".btn" })).toBeDisabled();
  });
});
