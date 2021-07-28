import { screen, cleanup, render } from "@testing-library/react";
import { Note } from "./Note";
import { v4 as uuidv4 } from "uuid";
import userEvent from "@testing-library/user-event";

describe("Note", () => {
  const id = uuidv4();
  const text = "Testing testing 123";
  const date = "29/07/2021";
  const mockHandleDeleteNote = jest.fn();
  const mockHandleEditMode = jest.fn();
  beforeEach(() => {
    render(
      <Note
        id={id}
        text={text}
        date={date}
        handleDeleteNote={mockHandleDeleteNote}
        handleEditMode={mockHandleEditMode}
      />
    );
  });
  afterEach(() => {
    cleanup();
  });

  it("should render Note component", () => {
    expect(screen.getByTitle("note-text").textContent).toBe(text);
    expect(screen.getByTitle("note-date").textContent).toBe(date);
    expect(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("button", { name: "Edit" }));
  });

  it("should call handleDeleteNote when delete button pressed", () => {
    userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(mockHandleDeleteNote).toHaveBeenCalled();
  });
  it("should call handleEditMode when edit button pressed", () => {
    userEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(mockHandleEditMode).toHaveBeenCalled();
  });
});
