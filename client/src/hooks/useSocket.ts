import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { NoteData, Notes } from '../types';

export const useSocket = (
  notes: Notes,
  setNotes: (
    value: ((prevState: NoteData[]) => NoteData[]) | NoteData[]
  ) => void
) => {
  const socket = useRef<null | Socket>(null);

  useEffect(() => {
    socket.current = io('0.0.0.0:5000');

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    socket.current?.on('server:send-all-notes', (data) => {
      const receivedNotes = data.map((note: { id: number; data: string }) =>
        JSON.parse(note.data)
      );
      setNotes(receivedNotes);
    });

    socket.current?.on('received-notes', (data) => {
      const updateNotes = JSON.parse(data);
      setNotes(updateNotes);
    });

    socket.current?.on('server:new-note', (data) => {
      const receivedNote = JSON.parse(data.data);
      setNotes([...notes, receivedNote]);
    });
  }, [notes]);

  return { socket };
};
