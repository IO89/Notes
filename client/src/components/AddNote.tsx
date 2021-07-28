import { ChangeEvent, useState } from "react";

type AddNoteProps = {
  handleAddNote: (text: string) => void;
};
export const AddNote = ({ handleAddNote }: AddNoteProps) => {
  const [noteText, setNoteText] = useState<string>("");
  const charLimit = 200;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (charLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };

  return (
    <div className="note new">
      <textarea
        rows={8}
        cols={10}
        placeholder="Add a note..."
        onChange={handleChange}
        value={noteText}
      />
      <div className="note-footer">
        <small>{charLimit - noteText.length}</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
