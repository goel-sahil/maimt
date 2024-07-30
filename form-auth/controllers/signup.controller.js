const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class SignupController {

    /**
     * Displays the form to register a user.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async showRegisterForm(req, res) {
        return res.render('auth/register', { title: 'User Signup', showSuccess: false });
    }


    /**
     * Signup the user.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async register(req, res) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            job_title: req.body.job_title
        });
        user.password = bcrypt.hashSync(req.body.password, 10);

        if (await user.save()) {
            return res.render('auth/register', { title: 'User Signup', showSuccess: true });
        }
        return res.json({
            message: 'Something went wrong!'
        });
    }
}

module.exports = SignupController