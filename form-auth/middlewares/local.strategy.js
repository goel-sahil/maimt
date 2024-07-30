const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const User = require('../models/user.model'); // Ensure this imports the correct User model
const passport = require('passport');

// Define the local strategy for Passport
const localStrategy = new LocalStrategy({
    usernameField: 'email', // Field used for username is 'email'
}, async (email, password, done) => {
    try {
        // Find user by email
        const user = await User.findOne({
            where: { email: email } // Make sure your User model has 'email' field
        });

        // Check if user exists
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' }); // Provide a message for feedback
        }

        // Compare passwords asynchronously
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Check if password is correct
        if (!isPasswordCorrect) {
            return done(null, false, { message: 'Incorrect password.' }); // Provide a message for feedback
        }

        // If user is found and password is correct, return the user object
        return done(null, user);
    } catch (error) {
        // Handle any errors that occur during the process
        return done(error);
    }
});


// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        // Find user by ID
        const user = await User.findByPk(id); // Use findByPk or equivalent method to find user by ID
        if (user) {
            done(null, user); // If user is found, pass the user object to done
        } else {
            done(new Error('User not found')); // Handle user not found scenario
        }
    } catch (error) {
        done(error); // Handle errors during deserialization
    }
});

module.exports = localStrategy;
