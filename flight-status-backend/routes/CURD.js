const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Define routes
router.get('/flights', flightController.getFlights);
router.get('/flights/:id', flightController.getFlightById);
router.post('/flights', flightController.addFlight);
router.put('/flights/:id', flightController.updateFlight);
router.delete('/flights/:id', flightController.deleteFlight);

module.exports = router;
