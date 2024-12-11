const express = require('express');
const router = express.Router();

// Get Notes: GET "/api/notes/"
router.get('/', (req, res) => {
    try {
        res.json([]);
    } catch (error) {
        console.error("Error fetching notes:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
