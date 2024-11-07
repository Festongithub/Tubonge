const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 30
		},
		bio : {
			type: String,
			default: ""
		},
		photo: {
			type: String
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
			minlength: 3,
			maxlength: 1024
		}
	},
	{
		timestamps: true,
	}
);

const user = mongoose.model("User", UserSchema);
module.exports = user;
