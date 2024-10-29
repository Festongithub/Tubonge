import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/chatContext"

export const useFetchLatestMessage = (chat) =>{
    const { newMessage, notification} = useContext(ChatContext);
    const { latestMessage, setlatestMessage} = useState(null);

    useEffect(() => {
        const getMessage = async() =>{

            if
        }
    })
}