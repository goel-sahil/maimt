class UserController {
    static async getProfile(req, res) {
        return res.render('user/profile', { user: req.user });
    }

    static async logout(req, res) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
        });
    }
}

module.exports = UserController;