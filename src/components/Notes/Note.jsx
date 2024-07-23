import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function Note({ title, content, onDelete, id, onUpdate }) {
  const handleUpdateClick = () => {
    onUpdate({ id, title, content });
  };

  return (
    <div className="note" onClick={handleUpdateClick}>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>
        <MdDelete size={25} />
      </button>
      <button onClick={handleUpdateClick}>
        <MdEdit size={25} />
      </button>
    </div>
  );
}

export default Note;
