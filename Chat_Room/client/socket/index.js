import { disconnect } from 'mongoose';
import { Server }  from 'socket.io'

const io = new Server({cors: "http://localhost:5173"})

io.on('connection', (socket) =>{
    console.log(`new connection`, socket.id);

    let onlineUsers = [];

    // listen to a connection
    socket.on("addNewUser", (userId) =>{
        onlineUsers.some(user => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId:socket.id,

    });
    console.log(`onlineUsers`, onlineUsers);
    io.emit("getonlineusers", onlineUsers);
    });

    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId);
        
        if(user){
          io.to(user.socketId).emit("getMessage", message); 
        }
    })
    socket.on("disconnect", () => {
       onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
       io.emit("getonlineusers", onlineUsers);
    })
})

io.listen(5000);