const messageModel = require('../models/messageModel');
const { publisher } = require('../Client');

// createMessage

const createMessage = async(req, res) => {
    const { chatId, senderId, text} = req.body;

    if(!chatId || !senderId || !text ){
        return res.status(400).json({error: "chatId, senderId, and text required"})
    }
    try 
    {
        const message = new messageModel({ chatId, senderId, text});
        const response = await message.save()

        const messageData = {
            chatId,
            senderId,
            text,
            createdAt: response.createdAt
        };
        publisher.publish(chatId, JSON.stringify(messageData));

        res.status(200).json({ message: "Message sent successfully", data:response });
    }catch(error){
	console.log(error);
	res.status(500).json({error: "Failed to send message" });
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
