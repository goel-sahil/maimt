const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile'); // Redirect to profile or any other page if logged in
    }
    next(); // Continue to the requested route if not logged in
};

module.exports = isLoggedIn;