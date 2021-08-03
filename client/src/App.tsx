import React, { useEffect, useState } from "react";
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

  /* Connect and disconnect to web socket server*/
  const [socket,setSocket]=useState<Socket>();

  useEffect(()=>{
   const s = io("http://localhost:5000");
   setSocket(s)

   return () =>{
     s.disconnect();
   }
  },[]);

  useEffect(()=>{
    if(!socket) return;

    socket.emit('send-notes',JSON.stringify(notes))

  },[notes])

  useEffect(()=>{
    if(!socket) return;

    socket.on('received-notes',notes=>{
      setNotes(JSON.parse(notes))
    })
    // return()=>{
    //   socket.off('receive-changes',notes)
    // }

  },[])

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
