import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const { notes, getNotes } = useContext(NoteContext);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    },[]);

    return (
        <div className="notes-container">
            <h1>Your Notes</h1>
            <div className="row">
                {Array.isArray(notes) && notes.map((note) => (
                    <div key={note._id} className="col-md-3">
                        <NoteItem note={note} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;