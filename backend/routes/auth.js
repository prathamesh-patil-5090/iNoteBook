const bcrypt = require('bcrypt');
const express = require('express');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "nuhhhh$uhhhhhh";

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". Doesn't require Auth
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
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log({authToken});
        res.json({authToken});
        //.then(user => res.json(user)).catch(err => res.status(500).json({ error: `Internal Server Error: ${err.message}` }));
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

// ROUTE 2 : Authenticating a User using: POST "/api/auth/login". Doesn't require Login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});
    }
        catch (error) {
            console.error("Error logging in user:", error.message);
            res.status(500).json({ error: `Internal Server Error: ${error.message}` });

    }
});

// ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error("Error getting user:", error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});

module.exports = router;
