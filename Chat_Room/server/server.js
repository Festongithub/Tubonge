const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user.model");
const router = require("./Routes/userRoutes");
const roomRoutes = require("./Routes/roomRoutes");
const messageRoutes = require('./Routes/messageRoute')

const app  = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", user);
app.use("/api/rooms", roomRoutes);
app.use('/api/messages', messageRoutes);

require("dotenv").config();


const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

app.get("/", router);


app.listen(port, (req, res) => {
	console.log(`Sever running on port ${port}`)
})

mongoose.connect(uri)
.then(() => console.log("Connected successfully"))
.catch((error) => console.log("failed to connect",error.message));
