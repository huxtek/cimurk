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

  it("renders navigation links", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("+ Submit")).toBeInTheDocument();
  });

  it("shows Sign In button when not authenticated", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("shows user info after signing in", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);
    await user.click(screen.getByText("Sign In"));
    expect(screen.getByText("Kian Ahmadi")).toBeInTheDocument();
  });

  it("signs out when clicking user button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);
    await user.click(screen.getByText("Sign In"));
    await user.click(screen.getByText("Kian Ahmadi"));
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("highlights active Home link on /", () => {
    renderWithProviders(<Navbar />, { route: "/" });
    expect(screen.getByText("Home")).toHaveClass("active");
  });

  it("highlights active Projects link on /projects", () => {
    renderWithProviders(<Navbar />, { route: "/projects" });
    expect(screen.getByText("Projects")).toHaveClass("active");
  });
});
