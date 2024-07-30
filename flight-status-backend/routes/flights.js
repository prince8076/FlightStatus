const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
