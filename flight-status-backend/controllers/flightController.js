const Flight = require('../models/flight');
const sendMail = require('./SendNotificationController');
const User = require('../models/User');

exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
        console.log('Flights:', flights);
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        res.status(500).send('Server Error');
    }
};

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
    } catch (error) {
        console.error('Error adding flight:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.updateFlight = async (req, res) => {
    console.log('Updating flight with ID:', req.params.id);
    console.log('Request body:', req.body);

    try {
        // Find the flight by ID and update it
        const flight = await Flight.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!flight) return res.status(404).send('Flight not found');

        // Fetch users with the same flight_id
        const users = await User.find({ flight_id: flight.flight_id });
        console.log('Users with the same flight ID:', users);

        // Send notifications to users
        if (users.length > 0) {
            await sendMail(users, flight); // Pass flight details to sendMail
        }

        // Send the updated flight and users in the response
        res.json({ flight, users });

    } catch (error) {
        console.error('Error updating flight:', error.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteFlight = async (req, res) => {
    console.log('Deleting flight with ID:', req.params.id);
    try {
        const flight = await Flight.findOneAndDelete({ flight_id: req.params.id });
        if (!flight) {
            console.log('Flight not found');
            return res.status(404).send('Flight not found');
        }
        res.json({ msg: 'Flight removed' });
    } catch (error) {
        console.error('Error deleting flight:', error.message);
        res.status(500).send('Server Error');
    }
};
