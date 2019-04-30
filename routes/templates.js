var express = require('express');
var router = express.Router();

router.get('/home', function (req, res) {
    res.render('global/home')
})
router.get('/definations', function (req, res) {
    res.render('global/definations')
})
router.get('/definations/users', function (req, res) {
    res.render('singlePages/user')
})
router.get('/definations/userInProgram', function (req, res) {
    res.render('linking/userInProgram')
})
router.get('/definations/elements', function (req, res) {
    res.render('singlePages/elements')
})
router.get('/definations/addElement', function (req, res) {
    var elementType = {eType : req.query.elementTypeId}
    switch (req.query.elementTypeId) {
        case "3":
            res.render('partials/plugin', elementType)
            break;
        case "4":
            res.render('partials/database', elementType)
            break;
        case "5":
            res.render('partials/image', elementType)
            break;
        case "6":
        case "7":
        case "9":
            res.render('partials/sharedElements', elementType)
            break;
        case "8":
            res.render('partials/menu', elementType)
            break;
    }
})

router.get('/definations/editElement', function (req, res) {
    var elementType = {eType : req.query.elementTypeId}
    switch (req.query.elementTypeId) {
        case "3":
            res.render('partials/plugin', elementType)
            break;
        case "4":
            res.render('partials/database', elementType)
            break;
        case "5":
            res.render('partials/image', elementType)
            break;
        case "6":
        case "7":
        case "9":
            res.render('partials/sharedElements', elementType)
            break;
        case "8":
            res.render('partials/menu', elementType)
            break;
    }
})

module.exports = router;