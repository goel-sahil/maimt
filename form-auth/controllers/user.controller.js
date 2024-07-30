class UserController {
    /**
     * Fetch the profile
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getProfile(req, res) {
        return res.render('users/profile', {
            title: 'User Profile',
            user: req.user
        });
    }

    /**
     * Logout the user
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async logout(req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            return res.redirect('/auth/login');
        });
    }

}

module.exports = UserController