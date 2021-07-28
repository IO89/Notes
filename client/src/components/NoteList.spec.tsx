import { screen, cleanup, render, getByRole } from "@testing-library/react";
import { NoteList } from "./NoteList";
import { v4 as uuidv4 } from "uuid";

describe("NoteList", () => {
  const notes = [
    { id: uuidv4(), text: "Note-1", date: "29/07/2021" },
    {
      id: uuidv4(),
      text: "Note-2",
      date: "30/07/2021",
    },
  ];
  const mockHandleAddNote = jest.fn();
  const mockHandleDeleteNote = jest.fn();
  const mockHandleEditMode = jest.fn();

  render(
    <NoteList
      notes={notes}
      handleAddNote={mockHandleAddNote}
      handleDeleteNote={mockHandleDeleteNote}
      handleEditMode={mockHandleEditMode}
    />
  );

  it("should render NoteList component", () => {
    const noteTexts = screen.getAllByTitle("note-text");
    const noteDates = screen.getAllByTitle("note-date");

    expect(noteTexts.length).toBe(2);
    expect(noteTexts[0].textContent).toBe("Note-1");
    expect(noteTexts[1].textContent).toBe("Note-2");

    expect(noteDates.length).toBe(2);
    expect(noteDates[0].textContent).toBe("29/07/2021");
    expect(noteDates[1].textContent).toBe("30/07/2021");

    expect(screen.getByRole("button", { name: "Save" }));
  });
});
