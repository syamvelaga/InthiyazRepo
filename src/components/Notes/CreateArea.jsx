import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";

function CreateArea({ onAdd, onUpdate, currentNote }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleExpanded() {
    setExpanded(true);
  }

  function handleSubmit(event) {
    if (currentNote.id) {
      onUpdate(currentNote.id, note);
    } else {
      onAdd(note);
    }
    setNote({
      title: "",
      content: "",
    });
    setExpanded(false);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            value={note.content}
            onClick={handleExpanded}
            name="content"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button className="form-button" type="submit">
          <IoIosAdd size={35} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
