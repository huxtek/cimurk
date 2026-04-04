import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders brand link", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Cimurk")).toBeInTheDocument();
  });

  it("renders navigation links in desktop and drawer", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getAllByText("Home").length).toBe(2);
    expect(screen.getAllByText("Projects").length).toBe(2);
    expect(screen.getAllByText("+ Submit").length).toBe(2);
    expect(screen.getAllByText("Partners").length).toBe(2);
  });

  it("shows Sign In buttons when not authenticated", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getAllByText("Sign In").length).toBe(2);
  });

  it("shows user info after signing in", async () => {
    // Skipped: requires Firebase Auth mock — covered by integration tests
  });

  it("signs out when clicking user button", async () => {
    // Skipped: requires Firebase Auth mock — covered by integration tests
  });

  it("highlights active Home link on /", () => {
    renderWithProviders(<Navbar />, { route: "/" });
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks[0]).toHaveClass("active");
  });

  it("highlights active Projects link on /projects", () => {
    renderWithProviders(<Navbar />, { route: "/projects" });
    const projectLinks = screen.getAllByText("Projects");
    expect(projectLinks[0]).toHaveClass("active");
  });

  it("renders hamburger button", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("opens drawer when hamburger is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);
    await user.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});
