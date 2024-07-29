const Flight = require('../models/flight');

exports.getFlights = async () => {
    return await Flight.find();
};

exports.updateFlightStatus = async (update) => {
    const flight = await Flight.findOne({ id: update.id });
    if (flight) {
        flight.status = update.status;
        flight.gate = update.gate;
        await flight.save();
    }
};
