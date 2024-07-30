const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    flight_id: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['Email', 'Phone', 'App']
    },
    recipient: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (this.method === 'Email') {
                    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
                } else if (this.method === 'Phone') {
                    return /^\+?\d{10,15}$/.test(value);
                } else if (this.method === 'App') {
                    return /^[a-zA-Z0-9-_]{5,20}$/.test(value);
                }
                return false;
            },
            message: 'Invalid recipient format for the selected method'
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);