const express = require('express');
const {registerUser} = require('../controllers/userControllers');

const route = express.Router();

route.get("/register", registerUser);

module.exports = route;