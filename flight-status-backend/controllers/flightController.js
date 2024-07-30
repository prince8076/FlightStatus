const Flight = require('../models/flight');
const User = require('../models/User');
const sendMail = require('../controllers/SendNotificationController');

// Get all flights
exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        res.status(500).send('Server Error');
    }
};

// Get flight by ID
exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findOne({ flight_id: req.params.id });
        if (!flight) return res.status(404).send('Flight not found');
        res.json(flight);
    } catch (error) {
        console.error('Error fetching flight:', error.message);
        res.status(500).send('Server Error');
    }
};

// Add a new flight
exports.addFlight = async (req, res) => {
    const { flight_id, airline, status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        const newFlight = new Flight({
            flight_id,
            airline,
            status,
            departure_gate,
            arrival_gate,
            scheduled_departure,
            scheduled_arrival,
            actual_departure,
            actual_arrival
        });
        await newFlight.save();
        res.status(201).json(newFlight);

        // Send notifications to all users associated with the flight_id
        const users = await User.find({ flight_id });
        for (const user of users) {
            try {
                await sendMail(user.email, `Your flight ${flight_id} is ${status}`, `Departure gate: ${departure_gate}.`, `<p>Your flight <strong>${flight_id}</strong> is ${status}. Departure gate: ${departure_gate}.</p>`);
            } catch (mailError) {
                console.error('Error sending email:', mailError.message);
            }
        }
    } catch (error) {
        console.error('Error adding flight:', error.message);
        res.status(500).send('Server Error');
    }
};

// Update an existing flight
exports.updateFlight = async (req, res) => {
    console.log('Updating flight with ID:', req.params.id); // Log ID being updated
    console.log('Request body:', req.body); // Log the incoming request body

    try {
        const flight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!flight) return res.status(404).send('Flight not found');
        res.json(flight);

        // Send notifications to all users associated with the flight_id
        const users = await User.find({ flight_id: req.params.id });
        for (const user of users) {
            try {
                await sendMail(user.email, `Your flight ${req.params.id} has been updated`, `Status: ${req.body.status}. Departure gate: ${req.body.departure_gate}.`, `<p>Your flight <strong>${req.params.id}</strong> has been updated. Status: ${req.body.status}. Departure gate: ${req.body.departure_gate}.</p>`);
            } catch (mailError) {
                console.error('Error sending email:', mailError.message);
            }
        }
    } catch (error) {
        console.error('Error updating flight:', error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
    console.log('Deleting flight with ID:', req.params.id); // Debugging line
    try {
        const flight = await Flight.findOneAndDelete({ flight_id: req.params.id });
        if (!flight) {
            console.log('Flight not found'); // Debugging line
            return res.status(404).send('Flight not found');
        }
        res.json({ msg: 'Flight removed' });
    } catch (error) {
        console.error('Error deleting flight:', error.message);
        res.status(500).send('Server Error');
    }
};
