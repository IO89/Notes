import { screen, render, cleanup } from "@testing-library/react";
import { AddNote } from "./AddNote";
import userEvent from "@testing-library/user-event";

describe("AddNote", () => {
  const mockHandleAddNote = jest.fn();

  beforeEach(() => {
    render(<AddNote handleAddNote={mockHandleAddNote} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render addNote component", () => {
    expect(screen.getByRole("textbox"));
    expect(screen.getByRole("button", { name: "Save" }));
  });

  it("should call handleAddNote when save button presses", () => {
    userEvent.type(screen.getByRole("textbox"), "add some text");
    userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(mockHandleAddNote).toHaveBeenCalled();
  });
});
