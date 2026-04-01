import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("calls window.scrollTo on mount", () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("renders nothing", () => {
    window.scrollTo = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(container.innerHTML).toBe("");
  });
});
