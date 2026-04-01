import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import Footer from "./Footer";

describe("Footer", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders brand link", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Cimurk")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Cimurk. All rights reserved.`)).toBeInTheDocument();
  });

  it("renders legal links", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Terms & Conditions")).toHaveAttribute("href", "/terms");
    expect(screen.getByText("Privacy Policy")).toHaveAttribute("href", "/privacy");
  });

  it("renders social links", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByLabelText("X (Twitter)")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });
});
