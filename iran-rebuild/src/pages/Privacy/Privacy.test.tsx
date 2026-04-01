import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../test/renderWithProviders";
import Privacy from "./Privacy";

describe("Privacy", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders(<Privacy />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
