const Flight = require('../models/flight');
const User = require('../models/User');
const sendMail = require('../controllers/SendNotificationController');

// Update an existing flight
exports.updateFlight = async (req, res) => {
    console.log('Updating flight with ID:', req.params.id); // Log ID being updated
    console.log('Request body:', req.body); // Log the incoming request body

    try {
        // Find and update the flight
        const updatedFlight = await Flight.findOneAndUpdate(
            { flight_id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedFlight) {
            console.log('Flight not found'); // Debugging line
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Notify all users associated with the updated flight
        const users = await User.find({ flight_id: req.params.id });

        for (const user of users) {
            const subject = `Update on Flight ${req.params.id}`;
            const message = `Your flight ${req.params.id} has been updated. 
            Status: ${req.body.status}. 
            Departure gate: ${req.body.departure_gate}. 
            Scheduled departure: ${req.body.scheduled_departure}. 
            Actual departure: ${updatedFlight.actual_departure}.`;

            // Send email notification if method is Email
            if (user.method === 'Email') {
                await sendMail(user.email, subject, message);
            }
        }

        res.json(updatedFlight);

    } catch (error) {
        console.error('Error updating flight:', error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};
