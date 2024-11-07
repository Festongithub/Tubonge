const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	chatId:{
		type: String,
		required: true
	},
	
	senderId: {
		type: String,
		required: true,
	},

	text:{ 
		type:String,
		required: true,
	}
},
	{
		timestamps: true
	}
);

const message = mongoose.model("Message", messageSchema);

module.exports = message
