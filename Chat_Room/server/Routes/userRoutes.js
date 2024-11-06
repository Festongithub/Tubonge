const express = require('express');
const {registerUser,loginUser, findUser,getUsers} = require('../controllers/userControllers');

const router = express.Router();

router.post("/register", registerUser);

router.get("/", (req, res) => {
	res.send("Welcome to the Chat APIs")
})

router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers)

module.exports = router;
