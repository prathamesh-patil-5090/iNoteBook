import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
    const { notes } = useContext(NoteContext);

    return (
        <div className="row">
            <h1>Your Notes</h1>
            {notes.map((note) => (
                <div key={note.id} className="col-md-3">
                    <NoteItem note={note} />
                </div>
            ))}
        </div>
    );
};

Notes.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ),
};

export default Notes;
