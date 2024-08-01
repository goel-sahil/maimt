const express = require('express');
const AuthController = require('../controllers/auth.controller');
const passport = require('passport');
const router = express.Router();

router.get('/login', AuthController.showLoginForm);
router.get('/signup', AuthController.showSignupForm);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true
}), AuthController.login);
router.post('/signup', AuthController.signup);

module.exports = router;