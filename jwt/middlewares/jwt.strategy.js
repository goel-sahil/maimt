const config = require('../config/config');
const User = require('../models/user.model');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Configure JWT options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
};

// Define JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        // Find user by primary key (assuming payload contains user ID)
        const user = await User.findByPk(jwtPayload.id);

        // If user is not found, return false
        if (!user) {
            return done(null, false);
        }

        // If user is found, return the user object
        return done(null, user);
    } catch (error) {
        // Handle any errors
        return done(error, false);
    }
});

module.exports = jwtStrategy;
