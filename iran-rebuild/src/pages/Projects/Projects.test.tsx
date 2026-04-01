import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import Projects from "./Projects";

describe("Projects", () => {
  it("renders page heading", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("All Projects")).toBeInTheDocument();
  });

  it("renders filter dropdowns", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("Categories — All")).toBeInTheDocument();
    expect(screen.getByText("Timeline — All")).toBeInTheDocument();
    expect(screen.getByText("Budget — All")).toBeInTheDocument();
  });

  it("renders seed project cards", () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText("Draft Constitution Working Group")).toBeInTheDocument();
  });

  it("filters projects by category", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);
    await user.click(screen.getByText("Categories — All"));
    // Uncheck All to deselect everything
    await user.click(screen.getByLabelText("All"));
    // Check only one category
    await user.click(screen.getByLabelText("⚖️ Governance & Law"));
    expect(screen.getByText("Draft Constitution Working Group")).toBeInTheDocument();
  });

  it("shows empty state when no projects match", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);
    await user.click(screen.getByText("Categories — All"));
    await user.click(screen.getByLabelText("All"));
    expect(screen.getByText(/No projects match your filters/)).toBeInTheDocument();
  });
});
