// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    method: { type: String, required: true },
    recipient: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    token: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
