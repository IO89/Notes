import { useState } from "react";
import { NoteData, Notes } from "../types";
import { v4 as uuidv4 } from "uuid";

export const useNotes = ()=>{
  const [notes, setNotes] = useState<Notes>([
    { id: 'test-id', text: "Note-1", date: "29/07/2021" },
    {
      id: uuidv4(),
      text: "Note-2",
      date: "29/07/2021",
    },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteData>();

  const addNote = (text: string) => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      text: text,
      date: date.toLocaleDateString(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const editNote = (id: string, updatedText: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== id) {
        return note;
      } else {
        return { ...note, text: updatedText } as NoteData;
      }
    });

    setNotes(updatedNotes);
  };

  const switchEditMode = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setIsEditing(true);
    setCurrentNote(noteToEdit);
  };

  return {notes,setNotes,addNote,deleteNote,editNote,switchEditMode,isEditing,setIsEditing,currentNote}
}