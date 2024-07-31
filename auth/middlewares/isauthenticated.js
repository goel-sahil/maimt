const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;