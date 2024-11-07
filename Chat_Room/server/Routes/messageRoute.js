const express = require('express');
const { createMessage, getMessage } = require('../controllers/messageController')

const router = express.Router();

router.post('/send', createMessage);
router.get('/find/:chatId', getMessage);

module.exports = router;
