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
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("+ Submit")).toBeInTheDocument();
  });

  it("renders loading fallback for lazy routes", () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
