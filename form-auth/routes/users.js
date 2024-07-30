var express = require('express');
const UserController = require('../controllers/user.controller');
var router = express.Router();

router.get('/profile', UserController.getProfile);
router.get('/logout', UserController.logout);

module.exports = router;
