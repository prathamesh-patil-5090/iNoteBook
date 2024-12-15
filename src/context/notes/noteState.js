import React, { useEffect, useState } from 'react';
import NoteContext from './noteContext';
import { useNavigate, useLocation } from 'react-router-dom';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const NotesInitial = [];
    const [notes, setNotes] = useState(NotesInitial);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('token') && location.pathname !== '/signup') {
            navigate('/login');
        } else if (localStorage.getItem('token')) {
            getNotes();
        }
    }, [location, navigate]);

    // Get all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
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
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!response.ok) {
                // Handle HTTP errors
                const errorText = await response.text();
                console.error('Failed to add note:', errorText);
                return null;
            }
    
            const note = await response.json();
            setNotes((prevNotes) => [...prevNotes, note]);
            return note;
        } catch (error) {
            console.error('Error adding note:', error);
            return null;
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
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
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
        }
        }  
        // setNotes(newNotes);
        setNotes((newNotes) =>
            newNotes.map((note) =>
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