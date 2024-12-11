const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
