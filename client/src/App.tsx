import React, { useEffect, useState } from "react";

import { NoteList } from "./components/NoteList";
import { Search } from "./components/Search";
import { Header } from "./components/Header";
import { EditNote } from "./components/EditNote";
import { useNotes } from "./hooks/useNotes";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [dragId, setDragId] = useState<string>();

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
  };

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
              handleDrag={handleDrag}
              handleDrop={handleDrop}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
