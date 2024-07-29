var express = require('express');
const SignupController = require('../controllers/signup.controller');
const LoginController = require('../controllers/login.controller');
var router = express.Router();

router.post('/signup', SignupController.register);
router.post('/login', LoginController.login);

module.exports = router;
