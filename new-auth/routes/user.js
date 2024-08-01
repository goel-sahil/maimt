const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();


router.get('/profile', UserController.getProfile);
router.get('/logout', UserController.logout);

module.exports = router;