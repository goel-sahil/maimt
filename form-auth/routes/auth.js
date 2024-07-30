var express = require('express');
const passport = require('passport');
const SignupController = require('../controllers/signup.controller');
const LoginController = require('../controllers/login.controller');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');
var router = express.Router();

router.get('/signup', isLoggedIn, SignupController.showRegisterForm);
router.post('/signup', isLoggedIn, SignupController.register);

router.get('/login', isLoggedIn, LoginController.showLoginForm);
router.post('/login', isLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Handle error
        }

        if (!user) {
            req.flash('error', info.message || 'Login failed'); // Store error message in flash
            return res.redirect('/auth/login'); // Redirect back to login page
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Handle error
            }
            return res.redirect('/users/profile'); // Redirect to profile page
        });
    })(req, res, next)
});

module.exports = router;
