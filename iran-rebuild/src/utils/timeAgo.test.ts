import { describe, it, expect } from "vitest";
import { getTimeAgo } from "./timeAgo";

describe("getTimeAgo", () => {
  it("returns 'just now' for recent dates", () => {
    expect(getTimeAgo(new Date().toISOString())).toBe("just now");
  });

  it("returns minutes ago", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(getTimeAgo(date)).toBe("5m ago");
  });

  it("returns hours ago", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(getTimeAgo(date)).toBe("3h ago");
  });

  it("returns days ago", () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(getTimeAgo(date)).toBe("2d ago");
  });
});
