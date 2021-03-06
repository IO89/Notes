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
    socket.current?.on('server:send-all-notes', (data) => {
      const receivedNotes = data.map((note: { id: number; data: string }) =>
        JSON.parse(note.data)
      );
      // TODO: Sync received notes with localstorage and make sure not to overwrite
      // setNotes(receivedNotes);
    });
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    socket.current?.on('received-notes', (data) => {
      const updateNotes = JSON.parse(data);
      setNotes(updateNotes);
    });

    socket.current?.on('new-note', (data) => {
      setNotes([...notes, data]);
    });
  }, [notes]);

  return { socket };
};
