var express = require('express');
var router = express.Router();

var DAL = require('../../modules/DAL.js')

router.get('/', function (req, res) {
	DAL('uspGetUsers', null, function (err, records) {
		res.send(records.Users);
	})

})

router.post('/Add', function (req, res) {
	DAL('spAddUser', req.body, function (err, recs) {
		if (!err)
			res.send('ok')
		else
			res.send(err)
	})
})

router.post('/Edit', function (req, res) {
	res.send('ok')
	// DAL('spEditUser', req.body, function (err, recs) {
	// 	if (!err)
	// 		res.send('ok')
	// 	else
	// 		res.send(err)
	// })
})

router.use('/Delete', function (req, res) {
	res.send('ok')
	// DAL('spDeleteUser', req.body, function (err, recs) {
	// 	if (!err)
	// 		res.send('ok')
	// 	else
	// 		res.send(err)
	// })
})

module.exports = router;