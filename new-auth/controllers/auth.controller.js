const User = require('../models/user');
const bcrypt = require('bcrypt');

class AuthController {
    static async showLoginForm(req, res) {
        return res.render('auth/login', { message: req.flash('info'), error: req.flash('error') });
    }

    static async showSignupForm(req, res) {
        return res.render('auth/signup', { message: req.flash('error') });
    }

    static async login(req, res) {
        return res.redirect('/users/profile');
    }

    static async signup(req, res) {
        try {
            const data = req.body;
            const user = new User();
            user.name = data.name;
            user.email = data.email;
            user.password = await bcrypt.hash(data.password, 10);
            user.job_title = data.job_title;
            await user.save();
            req.flash('info', 'You have registered successfully!')
            return res.redirect('/auth/login');
        } catch (error) {
            console.log(error);
            req.flash('error', 'Something went wrong, please try again!')
            return res.redirect('/auth/signup');
        }
    }
}

module.exports = AuthController;