const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    roomId: {
        type: String,
        required: true,
        unique: true
    },
    roomName: {
        type: String,
        required: true,
    },
    isPrivate:{
        type: Boolean,
        default: false
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true,
}
);

const room = mongoose.model('Room', roomSchema);
module.exports = room;
