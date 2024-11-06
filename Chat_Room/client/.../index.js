const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const { Server } = require("socket.io")

const chatRoute = require('./Routes/chatRoute');
const messageRoute = require("./Route/messageRoute")
const userRoute = require('./Routes/userRoute');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/Chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) =>{
    res.send("Welcome to Chat API")
});

const uri = process.env.MONGO_URI;
const port = process.env.PORT 

const expserver = app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})

mongoose.connect(uri)
.then(() =>console.log(`Connection establihed`) )
.catch(error => console.error(error.message))

const io = new Server(expserver, {
    cors:{
        origin: process.env.CLIENT_URL;
    }
});

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
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            }); 
        }
    })
    socket.on("disconnect", () => {
       onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
       io.emit("getonlineusers", onlineUsers);
    })

