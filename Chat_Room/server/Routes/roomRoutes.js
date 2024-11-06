const expres = require('express');
const router = express.Router();
const  { createRoom, joinRoom, leaveRoom} = require("../controllers/roomControllers");

router.post('/create',createRoom);
router.post('/join',joinRoom);
router.post('/leave',leaveRoom);

module.exports = router;