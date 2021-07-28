import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  const mockHandleSwitchMode = jest.fn();
  render(<Header handleSwitchMode={mockHandleSwitchMode} />);
  it("should render header with switch mode button", function () {
    expect(screen.getByRole("heading", { name: "Notes" }));
    expect(screen.getByRole("button", { name: "Switch theme" }));
  });
});
