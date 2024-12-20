import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chats/UserChat";
import {AuthContext} from '../context/AuthContext';
import { updateCurrentChat } from '../context/chatContext'
import { ChatBox } from '../components/chats/chatBox'

const Chat = () => {
    const {user}  = useContext(AuthContext);
    const {userChats,
        isUserChatsLoading,
        userChatsError,
        updateCurrentChat
    } = useContext(ChatContext);

    return (<Container>
        { userChats?.length < 1 ? null:(
            <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow=0 pe-3" gap={4}>
                {isUserChatsLoading && <p>Loading chats...</p>}
                {userChats?.map((chat, index)=>{
                    return( 
                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user}/>
                    </div>
                    )
                })} 
            </Stack>
            <ChatBox />
        </Stack> 
        )}
    </Container>
    );
};

export default Chat;