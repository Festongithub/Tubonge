import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest , postRequest} from '../utils/services';

export const ChatContext = createContext();

export const ChatContextProvider =({ children, user}) => {
    const [ userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError] = useState(null);
    const [ potentialChats, setPotentialChats ] = useState(null);
    const [currentChat, setCurrentChat ] = useState(null);
    const [ messages, setMessages ] = useState(null)
    const [ isMessageLoading, setMessageisLoading ] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    useEffect( () => {

        const getUser = async() => {
            const response = await getRequest(`${baseUrl}/chats/${users}`);

            if(response.error){
                return console.log(`Error fetching users`, response);
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user?._id == u._id)
                return false;
                
                if(userChats){
                   isChatCreated =  userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
            }

             return !isChatCreated;
        });
        setPotentialChats(pChats)
    };
    getUser();
}, [userChats]);

    useEffect(() => {
        const getMessages = async() => {
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

                setMessageisLoading(false);

                if (response.error) {
                    return setUserChatsError(response)
                }
                setMessages(response)
            }

        }
        getMessages();
    }, [currentChat]);



    useEffect(() => {
        const getMessages = async() => {
                setMessageisLoading(true)
                setMessagesError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setLoading(false);

                if (response.error) {
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        getMessages();
    }, [user]);



const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat)
}, []);


const creatChat = useCallback( async(firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`,JSON.stringify({
            firstId,
            secondId
    })
        );

        if(response.error){
            console.log(`Error creating chat`, response);
        }

        setUserChats((prev) ={
            ...prev, response});
    }, [])
    return (<ChatContext.Provider value= {{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        creatChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messagesError
    }}
    >{children}
    </ChatContext.Provider>
    );

}
