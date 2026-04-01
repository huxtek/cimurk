import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "./AuthContext";

function TestConsumer() {
  const { user, signIn, signOut } = useAuth();
  return (
    <div>
      <span data-testid="status">{user ? user.name : "signed-out"}</span>
      <button onClick={signIn}>sign-in</button>
      <button onClick={signOut}>sign-out</button>
    </div>
  );
}

describe("AuthContext", () => {
  it("starts signed out", () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId("status")).toHaveTextContent("signed-out");
  });

  it("signs in with mock user", async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await user.click(screen.getByText("sign-in"));
    expect(screen.getByTestId("status")).toHaveTextContent("Kian Ahmadi");
  });

  it("signs out", async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await user.click(screen.getByText("sign-in"));
    await user.click(screen.getByText("sign-out"));
    expect(screen.getByTestId("status")).toHaveTextContent("signed-out");
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow("useAuth must be used within AuthProvider");
  });
});
