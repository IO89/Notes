import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { v4 as uuidv4 } from "uuid";
import { NoteList } from "./components/NoteList";
import { Search } from "./components/Search";
import { Header } from "./components/Header";
import { EditNote } from "./components/EditNote";
import { useNotes } from "./hooks/useNotes";

// const URL = 'ws://0.0.0.0:5000';

// const socket = io('http://0.0.0.0:5000')

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const {
    notes,
    setNotes,
    addNote,
    deleteNote,
    editNote,
    switchEditMode,
    isEditing,
    setIsEditing,
    currentNote,
  } = useNotes();

  /* Store and retrieve notes in local storage */
  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("notes-app-data") as string
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  // const [ws, setWs] = useState(new WebSocket(URL));

  // useEffect(() => {
  //     ws.onopen = () => {
  //         console.log('connected to server');
  //     }
  //
  //     ws.onmessage = (e) => {
  //         const note = JSON.parse(e.data);
  //         setNotes([...notes,note]);
  //     }
  //
  //     return () => {
  //         ws.onclose = () => {
  //             console.log('WebSocket Disconnected');
  //             setWs(new WebSocket(URL));
  //         }
  //     }
  // }, [ws.onmessage, ws.onopen, ws.onclose, notes]);
  //
  // const submitNote = (usr: string, msg: string) => {
  //     ws.send(JSON.stringify(note));
  //     setNotes([...notes,msg]);
  // }

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        {isEditing && currentNote ? (
          <EditNote
            handleSwitchEditMode={setIsEditing}
            handleUpdateNote={editNote}
            currentNote={currentNote}
          />
        ) : (
          <>
            <Header handleSwitchMode={setDarkMode} />
            <Search handleSearchNote={setSearchText} />
            <NoteList
              notes={notes.filter((note) =>
                note.text.toLocaleLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
              handleEditMode={switchEditMode}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
