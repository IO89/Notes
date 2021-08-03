import { NoteData } from "../types";
import React from "react";

type NoteProps = NoteData & {
  handleDeleteNote: (id: string) => void;
  handleEditMode: (id: string) => void;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) =>void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const Note = ({
  id,
  text,
  date,
  handleDeleteNote,
  handleEditMode,
                       handleDrag,
                       handleDrop
}: NoteProps) => {
  return (
    <div draggable={true} id={id} onDragOver={event => event.preventDefault()} onDragStart={handleDrag} onDrop={handleDrop} className="note">
      <span title="note-text">{text}</span>
      <div className="note-footer">
        <small title={"note-date"}>{date}</small>
        <span className="button-container">
          <button className="delete" onClick={() => handleDeleteNote(id)}>
            Delete
          </button>
          <button className="edit" onClick={() => handleEditMode(id)}>
            Edit
          </button>
        </span>
      </div>
    </div>
  );
};
