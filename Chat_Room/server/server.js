const express = require("express");
const http = require('http');
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user.model");
const router = require("./Routes/userRoutes");
const roomRoutes = require("./Routes/roomRoutes");
const messageRoutes = require('./Routes/messageRoute')
const socketIO = require('socket.io');

const { RoomSubsribers } = require('./controllers/subscribeController');
const { subscriber } = require("./Client");
const app  = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.json());
app.use(cors());

app.use("/api/users", user);
app.use("/api/rooms", roomRoutes);
app.use('/api/messages', messageRoutes);

require("dotenv").config();

const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

app.get("/", router);


io.on('connection', (socket) =>{
	console.log(`New client connected`);

	socket.on('joinRoom', (roomId) =>{
		socket.join(roomId);

	RoomSubsribers(roomId, (messageData) =>{
		io.to(roomId).emit('message', messageData);
	});

	});

	socket.on('leaveRoom', (roomId) => {
		socket.leave(roomId);
		subscriber.unscribe(roomId);
	});

	socket.on('disconnect', () =>{
		console.log('Client disconnected');
	});
});




app.listen(port, (req, res) => {
	console.log(`Sever running on port ${port}`)
})

mongoose.connect(uri)
.then(() => console.log("Connected successfully"))
.catch((error) => console.log("failed to connect",error.message));
