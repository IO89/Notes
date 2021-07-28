import { screen, render } from "@testing-library/react";
import { Search } from "./Search";

describe("Search component", () => {
  const mockHandleSearchNote = jest.fn();
  render(<Search handleSearchNote={mockHandleSearchNote} />);

  it("should render search component", function () {
    expect(screen.getByRole("textbox"));
  });
});
