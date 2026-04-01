import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../test/renderWithProviders";
import Terms from "./Terms";

describe("Terms", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders(<Terms />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
