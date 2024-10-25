const express = require('express');
const {
    registerUser,
    loginUser, 
    findUser,
    getUsers
} = require('../controllers/userControllers');

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/find/:userId", findUser);
route.get("/", getUsers)


module.exports = route;