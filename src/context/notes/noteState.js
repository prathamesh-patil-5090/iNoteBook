import React, { useState, useEffect } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyNTQ1Mn0.9HQ0loMFeyH_oasf0pkZaUaYaMnzqL_lsKwr9XcMrsY"
                // 'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (Array.isArray(json)) {
            setNotes(json);
        } else {
            setNotes([]);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    // Add a new note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyNTQ1Mn0.9HQ0loMFeyH_oasf0pkZaUaYaMnzqL_lsKwr9XcMrsY"
                // 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes((prevNotes) => prevNotes.concat(note));
    };

    // Delete a note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyNTQ1Mn0.9HQ0loMFeyH_oasf0pkZaUaYaMnzqL_lsKwr9XcMrsY"
                // 'auth-token': localStorage.getItem('token')
            }
        });
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyNTQ1Mn0.9HQ0loMFeyH_oasf0pkZaUaYaMnzqL_lsKwr9XcMrsY"
                // 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? json : note
            )
        );
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;