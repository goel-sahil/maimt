var express = require('express');
var router = express.Router();
const User = require('../controllers/user.controller');
const user = new User();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

router.post('/', body('name').notEmpty(), (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }

    res.send({ errors: result.array() });

}, User.registration);

router.post("/login", User.login)

router.use((req, res, next) => {
    try {
        let token = req.headers.authorization;
        let result = jwt.verify(token, 'shhhhh');
        req.user = result;
        next();
    } catch (error) {
        res.json({
            message: 'Please login again!'
        });
    }

})


router.get("/profile", User.getProfile)

module.exports = router;