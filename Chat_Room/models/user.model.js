const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 30,
            unique: true
        },

        password: 
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 15
        }
},
{
    timestamps: true,
}
)

const user = mongoose.model("User", UserSchema);
module.exports = user;