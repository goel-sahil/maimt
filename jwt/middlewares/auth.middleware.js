const passport = require('passport');

// Middleware function for JWT authentication
function authenticateJWT(req, res, next) {
    // Use Passport's JWT authentication strategy
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            // Pass any errors to the next middleware
            return next(err);
        }

        if (!user) {
            // If user is not authenticated, return a 401 Unauthorized response
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the authenticated user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    })(req, res, next);
}

module.exports = authenticateJWT;
