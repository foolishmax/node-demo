var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/video', require('./video'));

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
