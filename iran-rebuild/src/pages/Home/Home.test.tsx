import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import Home from "./Home";

describe("Home", () => {
  it("renders hero heading", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Building a Free Iran/)).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/A platform to share, discover/)).toBeInTheDocument();
  });

  it("renders Explore Projects and Submit buttons", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Explore Projects")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Submit Your Idea")).toHaveAttribute("href", "/submit");
  });

  it("renders stats section", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Total Votes")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  it("renders top 3 projects section", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Top Projects")).toBeInTheDocument();
    expect(screen.getByText("View All Projects →")).toBeInTheDocument();
  });

  it("shows at most 3 project cards", () => {
    renderWithProviders(<Home />);
    const cards = screen.getAllByRole("button");
    expect(cards.length).toBeLessThanOrEqual(3);
  });
});
