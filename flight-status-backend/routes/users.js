const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to add a new notification
router.post('/', async (req, res) => {
    try {
        const { flight_id, method, recipient, timestamp, token, email } = req.body;

        // Validate required fields
        if (!flight_id || !method || !recipient) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Optional: Check for non-null email
        const newUser = new User({ flight_id, method, recipient, timestamp, token });
        if (email) {
            newUser.email = email;
        }

        await newUser.save();

        res.status(200).json({ message: 'Notification added successfully!' });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
