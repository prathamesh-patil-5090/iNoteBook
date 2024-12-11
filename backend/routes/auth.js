const bcrypt = require('bcrypt');
const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();


// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({ name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        res.json(user);
        //.then(user => res.json(user)).catch(err => res.status(500).json({ error: `Internal Server Error: ${err.message}` }));
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

module.exports = router;
