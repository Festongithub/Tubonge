const messageModel = require('../models/messageModel');

// createMessage

const createMessage = async(req, res) => {
    const { chatId, senderId, text} = req.body

    const message = new messageModel({
	chatId, senderId, text
    })

    try {
	const response = await message.save()
	res.status(200).json(repsonse)
    }catch(error){
	console.log(error);
	res.status(500).json(error);
    }
}
// getmessages

const getMessage = async(req, res) =>{
    const {chatId} = req.params;

    try {
	const messages = await messageModel.find({chatId})
	res.status(200).json(repsonse)

    }catch(error){
	console.log(error);
	res.status(500).json(error);
    }
}

module.exports = {createMessage, getMessage};
