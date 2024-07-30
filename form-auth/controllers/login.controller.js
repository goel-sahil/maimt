const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class LoginController {
    /**
     * Display the login form
     * @param {*} req 
     * @param {*} res 
     */
    static async showLoginForm(req, res) {
        return res.render('auth/login', { title: 'Login' });
    }
}

module.exports = LoginController;
