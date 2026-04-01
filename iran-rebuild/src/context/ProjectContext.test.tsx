import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectProvider, useProjects } from "./ProjectContext";

function TestConsumer() {
  const { projects, userVotes, addProject, vote } = useProjects();
  return (
    <div>
      <span data-testid="count">{projects.length}</span>
      <span data-testid="first-votes">{projects[0]?.votes}</span>
      <span data-testid="first-id">{projects[0]?.id}</span>
      <span data-testid="user-vote">{userVotes[projects[0]?.id] || 0}</span>
      <button onClick={() => addProject({
        title: "New", description: "Desc", category: "Cat", stage: "Stage",
        timeline: "1-2 years", budget: "$10K - $50K",
      })}>add</button>
      <button onClick={() => vote(projects[0]?.id, 1)}>upvote</button>
      <button onClick={() => vote(projects[0]?.id, -1)}>downvote</button>
    </div>
  );
}

describe("ProjectContext", () => {
  it("provides seed projects", () => {
    render(<ProjectProvider><TestConsumer /></ProjectProvider>);
    expect(Number(screen.getByTestId("count").textContent)).toBeGreaterThan(0);
  });

  it("adds a project", async () => {
    const user = userEvent.setup();
    render(<ProjectProvider><TestConsumer /></ProjectProvider>);
    const initial = Number(screen.getByTestId("count").textContent);
    await user.click(screen.getByText("add"));
    expect(Number(screen.getByTestId("count").textContent)).toBe(initial + 1);
  });

  it("upvotes a project", async () => {
    const user = userEvent.setup();
    render(<ProjectProvider><TestConsumer /></ProjectProvider>);
    const initial = Number(screen.getByTestId("first-votes").textContent);
    await user.click(screen.getByText("upvote"));
    expect(Number(screen.getByTestId("first-votes").textContent)).toBe(initial + 1);
  });

  it("toggles upvote off", async () => {
    const user = userEvent.setup();
    render(<ProjectProvider><TestConsumer /></ProjectProvider>);
    const initial = Number(screen.getByTestId("first-votes").textContent);
    await user.click(screen.getByText("upvote"));
    await user.click(screen.getByText("upvote"));
    expect(Number(screen.getByTestId("first-votes").textContent)).toBe(initial);
  });

  it("switches from upvote to downvote", async () => {
    const user = userEvent.setup();
    render(<ProjectProvider><TestConsumer /></ProjectProvider>);
    const initial = Number(screen.getByTestId("first-votes").textContent);
    await user.click(screen.getByText("upvote"));
    await user.click(screen.getByText("downvote"));
    expect(Number(screen.getByTestId("first-votes").textContent)).toBe(initial - 1);
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow("useProjects must be used within ProjectProvider");
  });
});
