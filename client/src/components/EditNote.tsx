import { NoteData } from "../types";
import { ChangeEvent, useState } from "react";

type EditNoteProps = {
  currentNote: NoteData;
  handleUpdateNote: (id: string, text: string) => void;
  handleSwitchEditMode: (
    previousMode: (previousMode: boolean) => boolean
  ) => void;
};
const charLimit = 200;

export const EditNote = ({
  currentNote,
  handleUpdateNote,
  handleSwitchEditMode,
}: EditNoteProps) => {
  const [updatedText, setUpdatedText] = useState(currentNote.text);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (charLimit - e.target.value.length >= 0) {
      setUpdatedText(e.target.value);
    }
  };

  const handleUpdateClick = () => {
    handleUpdateNote(currentNote.id, updatedText);
    handleSwitchEditMode((previousMode) => !previousMode);
  };

  return (
    <div className="note new">
      <textarea
        rows={8}
        cols={10}
        placeholder="Edit note..."
        onChange={handleChange}
        value={updatedText}
      />
      <div className="note-footer">
        <small>{charLimit - currentNote.text.length}</small>
        <button className="save" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
    </div>
  );
};
