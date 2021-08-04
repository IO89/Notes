import { useNotes } from "./useNotes";
import { act, cleanup, renderHook } from "@testing-library/react-hooks";

describe("useNotes", () => {
  let renderedHook;
  beforeEach(() => {
    renderedHook = renderHook(() => useNotes());
  });

  afterEach(() => cleanup());

  it("should render notes", () => {
    expect(renderedHook.result.current.notes.length).toBe(2);
    expect(renderedHook.result.current.notes[0].text).toBe("Note-1");
    expect(renderedHook.result.current.notes[1].text).toBe("Note-2");
  });

  it("should add new note", () => {
    act(() => {
      renderedHook.result.current.addNote("New note added");
    });

    expect(renderedHook.result.current.notes.length).toBe(3);
    expect(renderedHook.result.current.notes[2].text).toBe("New note added");
  });

  it("should be able to delete note", () => {
    expect(renderedHook.result.current.notes.length).toBe(2);
    act(() => {
      renderedHook.result.current.deleteNote("test-id");
    });

    expect(renderedHook.result.current.notes.length).toBe(1);
  });

  it("should have editing mode off by default", () => {
    expect(renderedHook.result.current.isEditing).toBeFalsy();
  });

  it("should switch to editing mode", () => {
    act(() => {
      renderedHook.result.current.switchEditMode("test-id");
    });

    expect(renderedHook.result.current.isEditing).toBeTruthy();
  });
});
