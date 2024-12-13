import React from 'react'
import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const NotesInitial =  [
            {
                "title": "my title",
                "description": "my description",
                "tag": "my tag",
                "id": "1"
            },
            {
                "title": "my title",
                "description": "my description",
                "tag": "my tag",
                "id": "2"
            },
            {
                "title": "my title",
                "description": "my description",
                "tag": "my tag",
                "id": "3"
            }
    ]

    const [notes, setNotes] = useState(NotesInitial)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
