import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const NotesInitial = [];

    const [notes, setNotes] = useState(NotesInitial);

    // Get all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyOTQ3OX0.Gjzi-rBZyPp1Cqzgej_z7Mav4ow9MsNei8uMEUsmmt0"
            }
        });
        const json = await response.json();
        if (Array.isArray(json)) {
            setNotes(json);
        } else {
            setNotes([]);
        }
    };

    // Add a new note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyOTQ3OX0.Gjzi-rBZyPp1Cqzgej_z7Mav4ow9MsNei8uMEUsmmt0"
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
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyOTQ3OX0.Gjzi-rBZyPp1Cqzgej_z7Mav4ow9MsNei8uMEUsmmt0"
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
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1OWNjMjMzNjQ4YTBiMDI0YzEzZmM0In0sImlhdCI6MTczNDIyOTQ3OX0.Gjzi-rBZyPp1Cqzgej_z7Mav4ow9MsNei8uMEUsmmt0"
            },
            body: JSON.stringify({ title, description, tag })
        });
        if (response.status !== 200) {
            console.error("Failed to update the note");
            return;
        }
        // const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let i = 0; i < newNotes.length; i++) {
            if(newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        // setNotes((prevNotes) =>
        //     prevNotes.map((note) =>
        //         note._id === id ? json : note
        //     )
        // );
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;