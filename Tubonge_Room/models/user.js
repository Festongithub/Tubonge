const mongoose = require('mongoose');

// User schame design 

const UserSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true,
            uinque: true
        },
        
        password: { 
            type: String, 
            require: true, 
            uinque: true 
        },
        
        profilePicture:{ 
            type: String 
        },
        
        user_bio: { 
            type: String 
        },
    });

module.exports = mongoose.model('User', UserSchema);