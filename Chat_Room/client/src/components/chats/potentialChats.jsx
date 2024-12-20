import { useContext, useState } from "react"
import { ChatContext } from "../../context/chatContext"
import { AuthContext } from "../../context/AuthContext"

const PotentialChats = () => {
    const {user} = useContext(AuthContext);
    const {potentialChats, creatChat, onlineUsers } = useState(ChatContext)
    console.log("PotentialChats", potentialChats)
    return (<>
    <div className="all-users" key ={index}
    onClick={() =>creatChat(user._id, u._id)}>
        {potentialChats && 
        potentialChats.map((u, index) => {
            return (
            <div className="single-user" key={index}>
                {u.name}
                <span class={
                    onlineUsers?.some((user) => 
                    user?.userId === u?._id  ) 
                    ? "user-online": ""}>
                    </span>
                </div>
            );
        })}
    </div>
    </>)
};

export default PotentialChats;