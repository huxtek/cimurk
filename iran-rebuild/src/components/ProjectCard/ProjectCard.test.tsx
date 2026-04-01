import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../types";

const mockProject: Project = {
  id: "test-1",
  title: "Test Project",
  description: "A test project description",
  category: "💻 Software & Technology",
  stage: "💡 Idea",
  timeline: "6-12 months",
  budget: "$50K - $100K",
  author: "Test Author",
  votes: 10,
  createdAt: "2026-01-01",
};

describe("ProjectCard", () => {
  it("renders project title and description", () => {
    renderWithProviders(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders category and stage tags", () => {
    renderWithProviders(<ProjectCard project={mockProject} />);
    expect(screen.getByText("💻 Software & Technology")).toBeInTheDocument();
    expect(screen.getByText("💡 Idea")).toBeInTheDocument();
  });

  it("renders author when provided", () => {
    renderWithProviders(<ProjectCard project={mockProject} />);
    expect(screen.getByText("by Test Author")).toBeInTheDocument();
  });

  it("does not render author when not provided", () => {
    const noAuthor = { ...mockProject, author: undefined };
    renderWithProviders(<ProjectCard project={noAuthor} />);
    expect(screen.queryByText(/^by /)).not.toBeInTheDocument();
  });

  it("renders vote count", () => {
    renderWithProviders(<ProjectCard project={mockProject} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders upvote and downvote buttons in full variant", () => {
    renderWithProviders(<ProjectCard project={mockProject} variant="full" />);
    expect(screen.getByLabelText("Upvote")).toBeInTheDocument();
    expect(screen.getByLabelText("Downvote")).toBeInTheDocument();
  });

  it("does not render vote buttons in preview variant", () => {
    renderWithProviders(<ProjectCard project={mockProject} variant="preview" />);
    expect(screen.queryByLabelText("Upvote")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Downvote")).not.toBeInTheDocument();
  });

  it("navigates on click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectCard project={mockProject} />);
    await user.click(screen.getByText("Test Project"));
  });

  it("navigates on Enter key", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectCard project={mockProject} />);
    const card = screen.getByText("Test Project").closest("[role='button']") as HTMLElement;
    card.focus();
    await user.keyboard("{Enter}");
  });

  it("upvote applies voted-up class", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectCard project={mockProject} />);
    const upBtn = screen.getByLabelText("Upvote");
    await user.click(upBtn);
    expect(upBtn).toHaveClass("votedUp");
  });

  it("downvote applies voted-down class", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectCard project={mockProject} />);
    const downBtn = screen.getByLabelText("Downvote");
    await user.click(downBtn);
    expect(downBtn).toHaveClass("votedDown");
  });
});
