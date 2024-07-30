const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flight_id: { type: String, required: true, unique: true },
    airline: String,
    status: String,
    departure_gate: String,
    arrival_gate: String,
    scheduled_departure: Date,
    scheduled_arrival: Date,
    actual_departure: Date,
    actual_arrival: Date
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
