var express = require('express');
var router = express.Router();
const videoController = require('../controller/video');

router.get('/', videoController.list);

module.exports = router;
