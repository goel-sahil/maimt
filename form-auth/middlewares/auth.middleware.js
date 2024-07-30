const passport = require('passport');

// Middleware function for JWT authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
        res.redirect('/auth/login'); // Redirect to login page if user is not authenticated
    }
};

module.exports = isAuthenticated;
