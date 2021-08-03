import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { NoteList } from "./components/NoteList";
import { Search } from "./components/Search";
import { Header } from "./components/Header";
import { EditNote } from "./components/EditNote";
import { useNotes } from "./hooks/useNotes";

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
