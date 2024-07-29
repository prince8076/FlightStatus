const Flight = require('../models/flight');

const getFlightIds = async () => {
    try {
        const flights = await Flight.find({}, { flight_id: 1, _id: 0 });
        return flights.map(flight => flight.flight_id);
    } catch (error) {
        console.error('Error fetching flight IDs:', error.message);
        throw new Error('Server Error');
    }
};

module.exports = getFlightIds;
