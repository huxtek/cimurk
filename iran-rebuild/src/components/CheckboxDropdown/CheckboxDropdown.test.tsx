import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxDropdown from "./CheckboxDropdown";

const OPTIONS = ["Alpha", "Beta", "Gamma"] as const;

describe("CheckboxDropdown", () => {
  it("shows label with All when all selected", () => {
    const selected = new Set<string>(Array.from(OPTIONS));
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={() => {}} />);
    expect(screen.getByText("Test — All")).toBeInTheDocument();
  });

  it("shows label with count when partially selected", () => {
    const selected = new Set<string>(["Alpha"]);
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={() => {}} />);
    expect(screen.getByText("Test (1)")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    const selected = new Set<string>(Array.from(OPTIONS));
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={() => {}} />);
    await user.click(screen.getByText("Test — All"));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
  });

  it("toggles individual option", async () => {
    const user = userEvent.setup();
    const selected = new Set<string>(Array.from(OPTIONS));
    const onChange = vi.fn();
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={onChange} />);
    await user.click(screen.getByText("Test — All"));
    await user.click(screen.getByLabelText("Alpha"));
    expect(onChange).toHaveBeenCalledWith(new Set(["Beta", "Gamma"]));
  });

  it("toggles all off when all selected", async () => {
    const user = userEvent.setup();
    const selected = new Set<string>(Array.from(OPTIONS));
    const onChange = vi.fn();
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={onChange} />);
    await user.click(screen.getByText("Test — All"));
    await user.click(screen.getByLabelText("All"));
    expect(onChange).toHaveBeenCalledWith(new Set());
  });

  it("toggles all on when none selected", async () => {
    const user = userEvent.setup();
    const selected = new Set<string>();
    const onChange = vi.fn();
    render(<CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={onChange} />);
    await user.click(screen.getByText("Test (0)"));
    await user.click(screen.getByLabelText("All"));
    expect(onChange).toHaveBeenCalledWith(new Set(["Alpha", "Beta", "Gamma"]));
  });

  it("closes dropdown on outside click", async () => {
    const user = userEvent.setup();
    const selected = new Set<string>(Array.from(OPTIONS));
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <CheckboxDropdown label="Test" options={OPTIONS} selected={selected} onChange={() => {}} />
      </div>
    );
    await user.click(screen.getByText("Test — All"));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });
});
