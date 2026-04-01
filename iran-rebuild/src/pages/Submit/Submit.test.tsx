import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import Submit from "./Submit";

describe("Submit", () => {
  it("renders form heading", () => {
    renderWithProviders(<Submit />);
    expect(screen.getByText("Submit a Project")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    renderWithProviders(<Submit />);
    expect(screen.getByPlaceholderText("Project title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Describe the project/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Anonymous if left blank")).toBeInTheDocument();
    expect(screen.getByText("Category *")).toBeInTheDocument();
    expect(screen.getByText("Stage *")).toBeInTheDocument();
    expect(screen.getByText("Estimated Timeline *")).toBeInTheDocument();
    expect(screen.getByText("Estimated Budget *")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderWithProviders(<Submit />);
    expect(screen.getByText("Submit Project")).toBeInTheDocument();
  });

  it("allows filling in the form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    await user.type(screen.getByPlaceholderText("Project title"), "My Project");
    await user.type(screen.getByPlaceholderText(/Describe the project/), "A great project");
    await user.type(screen.getByPlaceholderText("Anonymous if left blank"), "Author Name");
    expect(screen.getByPlaceholderText("Project title")).toHaveValue("My Project");
    expect(screen.getByPlaceholderText(/Describe the project/)).toHaveValue("A great project");
    expect(screen.getByPlaceholderText("Anonymous if left blank")).toHaveValue("Author Name");
  });

  it("submits the form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    await user.type(screen.getByPlaceholderText("Project title"), "My Project");
    await user.type(screen.getByPlaceholderText(/Describe the project/), "A great project");
    await user.click(screen.getByText("Submit Project"));
    // Form submits and navigates — no error
  });
});

describe("Submit - select fields", () => {
  it("allows changing category", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    const categorySelect = screen.getByText("Category *").closest("label")!.querySelector("select")!;
    await user.selectOptions(categorySelect, "💻 Software & Technology");
    expect(categorySelect).toHaveValue("💻 Software & Technology");
  });

  it("allows changing stage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    const stageSelect = screen.getByText("Stage *").closest("label")!.querySelector("select")!;
    await user.selectOptions(stageSelect, "🔍 Research");
    expect(stageSelect).toHaveValue("🔍 Research");
  });

  it("allows changing timeline", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    const timelineSelect = screen.getByText("Estimated Timeline *").closest("label")!.querySelector("select")!;
    await user.selectOptions(timelineSelect, "1-2 years");
    expect(timelineSelect).toHaveValue("1-2 years");
  });

  it("allows changing budget", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Submit />);
    const budgetSelect = screen.getByText("Estimated Budget *").closest("label")!.querySelector("select")!;
    await user.selectOptions(budgetSelect, "$1M - $10M");
    expect(budgetSelect).toHaveValue("$1M - $10M");
  });
});
