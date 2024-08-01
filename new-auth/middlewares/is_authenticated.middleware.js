function isAuthenticated(req, res, next) {
    // TODO: check if the user is authenticated or not
    // if user is authenticated, pass the request otherwise
    // redirect the user to login page
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/auth/login');
}

module.exports = isAuthenticated;