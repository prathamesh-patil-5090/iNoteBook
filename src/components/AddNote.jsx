import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); // Reset form fields
    };

    return (
        <form className="my-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={note.title}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Enter description"
                    value={note.description}
                    onChange={onChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    placeholder="Enter tag"
                    value={note.tag}
                    onChange={onChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add a Note</button>
        </form>
    );
};

export default AddNote;