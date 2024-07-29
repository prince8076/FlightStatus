const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const getFlightIds = require('../controllers/getFlightIds');

router.get('/flight-ids', async (req, res) => {
    try {
        const flightIds = await getFlightIds();
        res.json(flightIds);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});


router.get('/flights', flightController.getFlights);
router.get('/flights/:id', flightController.getFlightById);
router.post('/flights', flightController.addFlight);
router.put('/flights/:id', flightController.updateFlight);
router.delete('/flights/:id', flightController.deleteFlight);

module.exports = router;
