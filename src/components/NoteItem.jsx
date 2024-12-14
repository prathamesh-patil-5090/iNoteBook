import React, { useContext } from "react";
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const { deleteNote } = useContext(NoteContext);
  const { note } = props;

  return (
    <div className="container">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(note._id)}></i>
            <i className="fa-regular fa-pen-to-square mx-1" onClick={() => props.updateNote(note)}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;