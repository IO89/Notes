import { Note } from "./Note";
import { AddNote } from "./AddNote";
import { Notes } from "../types";
import React from "react";

type NoteListProps = {
  notes: Notes;
  handleAddNote: (text: string) => void;
  handleDeleteNote: (id: string) => void;
  handleEditMode: (id: string) => void;
  handleDrag:(e: React.DragEvent<HTMLDivElement>)=>void;
  handleDrop:(e: React.DragEvent<HTMLDivElement>)=>void;

};
export const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleEditMode,
   handleDrag,
   handleDrop

}: NoteListProps) => {
  return (
    <div className="notes-list">
      {notes
        .sort((a, b) => a.order - b.order)
        .map((note) => (
        <Note
          key={`${note.id}-${note.text}`}
          id={note.id}
          date={note.date}
          text={note.text}
          handleDeleteNote={handleDeleteNote}
          handleEditMode={handleEditMode}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          order={note.order}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};
