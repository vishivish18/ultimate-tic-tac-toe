var router = require('express').Router()
var User = require('../../models/user')


router.post('/', function(req, res, next) {
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email : req.body.email
    })
    user.save(function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(user);

    })

})


router.get('/', function(req, res, next) {

    User.find(function(err, users) {
        if (err) {
            return next(err)
        }
        res.json(users)
    })


})


module.exports = router
