import { NoteData } from "../types";

type NoteProps = NoteData & {
  handleDeleteNote: (id: string) => void;
  handleEditMode: (id: string) => void;
};

export const Note = ({
  id,
  text,
  date,
  handleDeleteNote,
  handleEditMode,
}: NoteProps) => {
  return (
    <div className="note">
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
