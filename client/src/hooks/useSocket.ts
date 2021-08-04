import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { NoteData, Notes } from "../types";

export const useSocket = (notes:Notes,setNotes: (value: (((prevState: NoteData[]) => NoteData[]) | NoteData[])) => void)=>{
  const socket = useRef<null|Socket>(null);

  useEffect(()=>{
    socket.current = io('localhost:5000');

    return () => {
      socket.current?.disconnect();
    }
  },[]);

  useEffect(()=>{
    if (!socket.current) return;

    socket.current?.on('received-notes',data =>{
      const receivedNotes = JSON.parse(data);
      setNotes(receivedNotes);
    })
  },[notes]);

  return {socket};
}