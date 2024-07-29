const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class LoginController {
    static async login(req, res) {
        try {
            // Find user by email
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            // Check if user exists
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // Compare passwords asynchronously
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            // Create the JWT token
            const tokenPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                job_title: user.job_title
            };
            const token = jwt.sign(tokenPayload, config.jwt.secret, { expiresIn: '1h' }); // Token expires in 1 hour

            return res.status(200).json({
                data: {
                    user: tokenPayload,
                    token
                },
                message: 'Login successful'
            });

        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

module.exports = LoginController;
