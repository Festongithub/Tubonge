const express = require('express');
const {
	registerUser,
	loginUser,
	findUser,
	getUsers,
	bioUpdate, 
	photoUpload, 
	videoUpload
} = require('../controllers/userControllers');
const photoUpload = require("../config/multer");

const router = express.Router();

// register user
router.post("/register", registerUser);

//upload user bio
router.put('/:userId/bio', bioUpdate);

//upload user photo
router.post('/userId/photo',photoUpload.single('photo'), photoUpload);

// upload user videos
router.post('/userId/videos', photoUpload.array('videos', 3), videoUpload);

router.get("/api", (req, res) => {
	res.send("Welcome to the Chat APIs")
})

router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers)

module.exports = router;
