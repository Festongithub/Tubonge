import { ChatContext } from "../../context/chatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

const UserChat = ({chat, user}) => {
    const  { recipientUser } = useFetchRecipientUser(chat, user)
    const { onlineUsers , notifications, markthisUserNotificationsAsRead } = useContext(ChatContext);

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId == recipientUser?._id
    )


    const isOnline = onlineUsers?.some((user) =>  user?.userId === recipientUser?._id)
    console.log(recipientUser);
    return( 
    <Stack 
    direction="horizontal" 
    gap={3} 
    className="user-card align-items-center p-1 justify-content-between"
    role="button"
    onClick ={() =>{
        if(thisUserNotifications?.length !== 0){
            markthisUserNotificationsAsRead(
                thisUserNotifications,
                notifications
            )
        }
    }}
    >
        <div className="d-flex">
            <div className="me-2">
                An image avatar upload
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                7/11/2024
            </div>
            <div className={thisUserNotifications?.length > 0 ? "this-user-notifications": ""}>
                {thisUserNotifications?.length > 0 ?
                thisUserNotifications?.length : ""}
            </div>
            <span className={isOnline ? "user-online": ""}></span>
        </div>
    </Stack>
    );
}

export default UserChat;