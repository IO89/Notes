import { NoteData, Notes } from "../types";
import React, { MutableRefObject, useState } from "react";
import { Socket } from "socket.io-client";

export const useDragAndDrop = (notes:Notes,setNotes: (value: (((prevState: NoteData[]) => NoteData[]) | NoteData[])) => void,socket:  MutableRefObject<Socket | null>)=>{
  const [notesOrder,setNotesOrder] = useState<number>(notes.length);
  const [dragId, setDragId] = useState<string>();

  const incrementNotesOrder = ()=> setNotesOrder(notesOrder+1);

  const handleDrag = (e:React.DragEvent<HTMLDivElement>)=>{
    setDragId(e.currentTarget.id);
  };

  const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
    const dragNote = notes.find((note) => note.id === dragId);
    const dropNote = notes.find((note) => note.id === e.currentTarget.id);

    const dragNoteOrder = dragNote?.order;
    const dropNoteOrder = dropNote?.order;

    const newNoteState = notes.map((note) => {
      if (dropNoteOrder && note.id === dragId) {
        note.order = dropNoteOrder;
      }
      if (dragNoteOrder && note.id === e.currentTarget.id) {
        note.order = dragNoteOrder;
      }
      return note;
    });
    setNotes(newNoteState);
    socket.current?.emit('send-notes', JSON.stringify(newNoteState))
  };

  return {notesOrder,setNotesOrder,dragId,setDragId,incrementNotesOrder,handleDrag,handleDrop}
}