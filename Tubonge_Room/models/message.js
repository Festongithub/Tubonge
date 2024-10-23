const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    RoomId: { type: String, required: true},
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    username: { type: String, required: true},
    message: { type: String, required: true, required: true },
    timestamp: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Message', MessageSchema);