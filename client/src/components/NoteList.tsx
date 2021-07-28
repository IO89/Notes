import { Note } from "./Note";
import { AddNote } from "./AddNote";
import { Notes } from "../types";

type NoteListProps = {
  notes: Notes;
  handleAddNote: (text: string) => void;
  handleDeleteNote: (id: string) => void;
  handleEditMode: (id: string) => void;
};
export const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleEditMode,
}: NoteListProps) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={`${note.id}-${note.text}`}
          id={note.id}
          date={note.date}
          text={note.text}
          handleDeleteNote={handleDeleteNote}
          handleEditMode={handleEditMode}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};
