const expres = require('express');
const router = express.Router();
const roomController = require("../controllers/roomControllers");

router.post('/api/rooms', roomController.createRoom);

module.exports = router;