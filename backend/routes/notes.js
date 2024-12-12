const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
var Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get loggedin User Details using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
    
});


// ROUTE 2 : Add a new note using: POST "/api/auth/getuser". Login required
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

module.exports = router;
