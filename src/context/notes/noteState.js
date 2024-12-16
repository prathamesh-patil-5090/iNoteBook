import React, { useEffect, useState } from 'react';
import NoteContext from './noteContext';
import { useNavigate, useLocation } from 'react-router-dom';

const TITLE_MIN_LENGTH = 4;
const DESCRIPTION_MIN_LENGTH = 4;
const TAG_MIN_LENGTH = 4;

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
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
    
            if (!response.ok) {
                const error = await response.text();
                console.error('Failed to update note:', error);
                return null;
            }
    
            let newNotes = JSON.parse(JSON.stringify(notes));
            
            // Logic to edit in client
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    if (title.length > TITLE_MIN_LENGTH) newNotes[index].title = title;
                    if (description.length > DESCRIPTION_MIN_LENGTH) newNotes[index].description = description;
                    if (tag.length > TAG_MIN_LENGTH) newNotes[index].tag = tag;
                    break;
                }
            }
            
            setNotes(newNotes);
            return newNotes.find(note => note._id === id);
        } catch (error) {
            console.error('Error updating note:', error);
            return null;
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;