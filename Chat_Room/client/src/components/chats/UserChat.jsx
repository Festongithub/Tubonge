import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({chat, user}) => {
    const  { recipientUser } = useFetchRecipientUser(chat, user)

    console.log(recipientUser);
    return <Stack direction="horizontal" gap={3} className="user-card align-items-center p-1 justify-content-between"
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
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>;
}

export default UserChat;