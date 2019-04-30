var express = require('express');
var router = express.Router();


router.use('/Users', require('./Users/users.js'))

router.use('/elements', require('./elements/elements.js'))

// var users = require('./users/users.js')
// 
// router.use('/Users', users)


module.exports = router;

// this is my second edit