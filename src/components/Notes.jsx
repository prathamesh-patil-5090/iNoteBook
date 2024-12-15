import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (note) => {
        ref.current.click();
        setCurrentNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
    };

    const handleClick = () => {
        editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
        refClose.current.click();
    };

    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    };

    return (
        <div className="notes-container">
            <div className="container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" ref={ref} style={{ display: 'none' }}> Edit Note </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" name="title" value={currentNote.title} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" id="description" name="description" value={currentNote.description} onChange={onChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tag">Tag</label>
                                        <input type="text" className="form-control" id="tag" name="tag" value={currentNote.tag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className="row">
                {Array.isArray(notes) && notes.map((note) => (
                    <div key={note._id} className="col-md-3">
                        <NoteItem note={note} updateNote={updateNote} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;