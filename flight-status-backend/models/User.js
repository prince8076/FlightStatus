const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    flight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    method: { type: String, required: true },
    recipient: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    token: { type: String },
    email: { type: String, sparse: true }
});

UserSchema.index({ email: 1 }, { unique: true, sparse: true });


module.exports = mongoose.model('User', UserSchema);
