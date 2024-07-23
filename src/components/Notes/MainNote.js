import React, { useState, useEffect } from "react";
import "./MainNote.css";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Count from "./Count";

function MainNote() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Save notes to local storage whenever notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    const updatedNotes = [...notes, { ...newNote, id: Date.now().toString() }];
    setNotes(updatedNotes);
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function updateNote(id, updatedNote) {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...updatedNote, id } : note
    );
    setNotes(updatedNotes);
    setCurrentNote({ id: null, title: "", content: "" });
  }

  function handleUpdateClick(note) {
    setCurrentNote({ id: note.id, title: note.title, content: note.content });
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // Filter notes based on search term
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="search-bar">
        <input
          className="search"
          type="text"
          placeholder="Search notes by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Count
          count={notes.length === 0 ? "Empty" : `Showing ${notes.length} Notes in Database`}
        />
        <CreateArea
          onAdd={addNote}
          onUpdate={updateNote}
          currentNote={currentNote}
        />
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            onUpdate={handleUpdateClick}
          />
        ))}
      </div>
    </div>
  );
}

export default MainNote;
