import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/chatContext"


export const useFetchLatestMessage = (chat) =>{
    const { newMessage, notification} = useContext(ChatContext);
    const { latestMessage, setlatestMessage} = useState(null);

    useEffect(() => {
        const getMessages = async() =>{

            if(response.error) {
		    return console.log("Error getting  messages...", error);
	    }

		const latestMessage = response[response?.length - 1];

		setLatestMessage(latestMessage);
        };
	    getMessage();
    }, [ newMessage, notifications]);

return (latestMessage);
};
