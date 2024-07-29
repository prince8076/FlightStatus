// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to add a notification
router.post('/', async (req, res) => {
    try {
        const { flight_id, method, recipient, timestamp, token } = req.body;

        // Validate required fields
        if (!flight_id || !method || !recipient) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create and save new User
        const newUser = new User({ flight_id, method, recipient, timestamp, token });
        await newUser.save();

        res.status(200).json({ message: 'Notification added successfully!' });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all notifications
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('flight_id');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
