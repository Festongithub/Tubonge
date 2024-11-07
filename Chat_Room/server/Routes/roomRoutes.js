const express = require('express');
const router = express.Router();
const  { createRoom,
	joinRoom, 
	leaveRoom,
	roomFinding
 } = require("../controllers/roomControllers");

router.post('/create', createRoom);
router.post('/join', joinRoom);
router.post('/leave', leaveRoom);
router.get('/find', roomFinding);

module.exports = router;
