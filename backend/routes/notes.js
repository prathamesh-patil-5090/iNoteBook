const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
var Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get loggedin User Details using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
    
});


// ROUTE 2 : Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'It must be atleast 5 characters').isLength({ min: 5 })
],  async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user : req.user.id
        })
        const SaveNote = await note.save();
        res.json(SaveNote);
        } catch (error) {
            console.error("Error getting user:", error.message);
            res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

// ROUTE 3 : Update an existing note using: PUT "http://localhost:5000/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4 : Delete an existing note using: POST "http://localhost:5000/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to delete
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;