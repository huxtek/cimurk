import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.stubGlobal("scrollTo", vi.fn());

describe("App", () => {
  it("renders navbar and footer", () => {
    render(<App />);
    const cimurks = screen.getAllByText("Cimurk");
    expect(cimurks.length).toBe(2);
  });

  it("renders navigation links", () => {
    render(<App />);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("+ Submit").length).toBeGreaterThanOrEqual(1);
  });

  it("renders loading fallback for lazy routes", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
