const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController')

/* GET home page. */
router.get('/', message_controller.message_list);
router.post('/', message_controller.send_message);


module.exports = router;
