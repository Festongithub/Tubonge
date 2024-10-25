const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Routes/userRoutes');
const app = express();


app.use(express.json());
app.use(express.json());
require("dotenv").config();

app.use(cors());
app.use("/api/users", userRoute);

const port = process.env.PORT || 3000;
//const uri = process.env.MONGO_URI;

// Read client data
app.get('/', (req, res) =>{
    res.send(`Welcome to our ChatApp Apis`);
})


app.listen(port, (req, res) =>{
    console.log(`Server running on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/Tubonge_User_DataBase').then(() => {
    console.log(`Connection Established`)
}).catch((error) => {
    console.log(`Connection failed`, error.message);
})
