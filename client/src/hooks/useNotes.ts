import { useState } from "react";
import { NoteData, Notes } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useDragAndDrop } from "./useDragAndDrop";
import { useSocket } from "./useSocket";

export const useNotes = ()=>{
  const [notes, setNotes] = useState<Notes>([
    { id: 'test-id', text: "Note-1", date: "29/07/2021", order:0 },
    {
      id: uuidv4(),
      text: "Note-2",
      date: "29/07/2021",
      order:1
    },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteData>();

  const {socket} = useSocket(notes,setNotes);
  const {notesOrder,incrementNotesOrder,handleDrop,handleDrag} = useDragAndDrop(notes,setNotes,socket)

  const addNote = (text: string) => {
    const date = new Date();
    incrementNotesOrder();
    const newNote = {
      id: uuidv4(),
      text: text,
      date: date.toLocaleDateString(),
      order:notesOrder
    };
    const updatedNotes =[...notes, newNote];
    setNotes(updatedNotes);
    socket.current?.emit('send-notes',JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    socket.current?.emit('send-notes',JSON.stringify(newNotes));
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
    socket.current?.emit('send-notes',JSON.stringify(updatedNotes))
  };

  const switchEditMode = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setIsEditing(true);
    setCurrentNote(noteToEdit);
  };


  return {notes,setNotes,addNote,deleteNote,editNote,switchEditMode,isEditing,setIsEditing,currentNote,handleDrag,handleDrop}
}