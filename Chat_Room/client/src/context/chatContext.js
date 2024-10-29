import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest , postRequest} from '../utils/services';
import { send } from 'vite';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user}) => {
    const [ userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError] = useState(null);
    const [ potentialChats, setPotentialChats ] = useState(null);
    const [currentChat, setCurrentChat ] = useState(null);
    const [ messages, setMessages ] = useState(null)
    const [ isMessageLoading, setMessageisLoading ] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [ sendTextMessageError, setSendTextMessageError ] = useState(null);
    const [ newMessage, setNewMessage] = useState(null);
    const [ socket, setSocket ] = useState(null);
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const  [ notifications, setNotifications ] = useState([]);
    const [ allUsers, setallUsers ] = useState([]);

    console.log("notifications", notifications);
        useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
                }
    }, [user]);

    // add onlineusers
    useEffect(() => {
        if(socket === nulll) return
        socket.emit("addNewUser", user?.id)
        socket.on("getonlineUsers", (res) =>{
            setOnlineUsers(res);
        })

        return () => {
            socket.on("getOnlineUsers");
        }

    }, [socket]);

    // send message
    useEffect(() => {
        if(socket === nulll) return;

        const recipientId = currentChat?.members.find((id) => id !==user?._id);

        socket.emit("sendMessage", {...newMessage, recipientId})
    }, [newMessage]);

    // receive message and notifications
    useEffect(() => {
        if(socket === nulll) return;

        socket.on("getMessage", res =>{
            if(currentChat?._id !== res.chatId) return;
            {
                setMessages((prev) => [...prev]);
            }
        });

        socket.on("getNotifications", (res) =>{
            const isChatOpen = currentChat?.members.some(id => id === res.senderId)

            if(isChatOpen) {
                setNotifications(prev => [{...res, isRead: true}, ...prev])
            } else {
                setNotifications(prev => [res, ...prev]);
            }
        })
        return () =>{
            socket.off("getMessage");
            socket.off("getNotification");
        };

    }, [socket, currentChat]);


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
        setPotentialChats(pChats);
        setallUsers(response);
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


const sendTextMessage = useCallback(async (textMessage, sender, currentChat, setTextMessage) => {
    if(!textMessage) return console.log("Type somethings")

    const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
        chatId: currentChat,
        senderId: sender._id,
        text: textMessage
    })
    );
    if(response.error) {
        return setSendTextMessageError(response);
    }
    setNewMessage(response);
    setMessages((prev) =>[...prev, response])
    setTextMessage(""); 
}, [])

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
    }, []);
    
    const markAllNotificationsAsRead = useCallback((notifications) => {
        const  eNotifications  = notifications.map((n)=> {
            return {...n, isRead: true};
        });

        setNotifications(eNotifications)
    },[]);

    const markNotificationsAsRead = useCallback((n, userChats, user, notifications) =>{
        // find chat to open

        const desiredChat = userChats.find(chat => {
            const chatMembers = [user._id, n.senderId];
            const isDessiredChat = chat?.members.every((member) =>{
                return  chatMembers.includes(member);
            });
            return isDessiredChat;
        });
        // mark now notification as read
        const  eNotifications = notifications.map(el =>{
            if(n.secondId === el.senderId) {
                return {...n, isRead:true}
            } else {
                return el
            }
        })
        updateCurrentChat(desiredChat);
        setNotifications(eNotifications);
    },
    []
    );

    const markthisUserNotificationsAsRead = useCallback((thisUserNotification, notifications) => {

        const eNotifications = notifications.map(el =>{
            let notification;

            thisUserNotification.forEach(n => {
                if(n.sender === el.secondId){
                    notification = {...n, isRead:true}
                }else{
                    notification = el
                }
        })
        return notification
        })
        setNotifications(eNotifications)
    }, [])


    return (
        <ChatContext.Provider
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            creatChat,
            updateCurrentChat,
            messages,
            isMessageLoading,
            messagesError,
            sendTextMessage,
            onlineUsers,
            notifications,
            allUsers,
            markAllNotificationsAsRead,
            markNotificationsAsRead,
            markthisUserNotificationsAsRead 
        }}
        >
            {children}
        </ChatContext.Provider>
    );

};

