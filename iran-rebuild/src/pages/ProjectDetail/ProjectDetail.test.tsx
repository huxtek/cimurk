import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { ProjectProvider } from "../../context/ProjectContext";
import { CommentProvider } from "../../context/CommentContext";
import ProjectDetail from "./ProjectDetail";

function renderDetail(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${id}`]}>
      <AuthProvider>
        <ProjectProvider>
          <CommentProvider>
            <Routes>
              <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
          </CommentProvider>
        </ProjectProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("ProjectDetail", () => {
  it("renders project not found for invalid id", () => {
    renderDetail("nonexistent");
    expect(screen.getByText(/Project not found/)).toBeInTheDocument();
  });

  it("renders project details for valid id", () => {
    renderDetail("1");
    expect(screen.getByText("Open-Source VPN for Iranian Citizens")).toBeInTheDocument();
    expect(screen.getByText(/censorship-resistant/)).toBeInTheDocument();
  });

  it("renders back link", () => {
    renderDetail("1");
    expect(screen.getByText("← Back to Projects")).toHaveAttribute("href", "/projects");
  });

  it("renders info card with all fields", () => {
    renderDetail("1");
    expect(screen.getByText("Votes")).toBeInTheDocument();
    expect(screen.getByText("Stage")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Budget")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
  });

  it("renders vote buttons", () => {
    renderDetail("1");
    expect(screen.getByLabelText("Upvote")).toBeInTheDocument();
    expect(screen.getByLabelText("Downvote")).toBeInTheDocument();
  });

  it("upvote changes vote count", async () => {
    const user = userEvent.setup();
    renderDetail("1");
    const initialVotes = screen.getByText("42");
    expect(initialVotes).toBeInTheDocument();
    await user.click(screen.getByLabelText("Upvote"));
    expect(screen.getByText("43")).toBeInTheDocument();
  });

  it("renders comment thread", () => {
    renderDetail("1");
    expect(screen.getByText("Discussion (0)")).toBeInTheDocument();
  });
});

describe("ProjectDetail - downvote", () => {
  it("downvote changes vote count", async () => {
    const user = userEvent.setup();
    renderDetail("1");
    await user.click(screen.getByLabelText("Downvote"));
    expect(screen.getByText("41")).toBeInTheDocument();
  });
});
