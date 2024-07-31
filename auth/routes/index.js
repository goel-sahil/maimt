var express = require('express');
var router = express.Router();
var passport = require('passport');
const isAuthenticated = require('../middlewares/isauthenticated');

/* GET home page. */
router.get('/', function (req, res, next) {
  const messages = req.flash('info');


  res.render('login', {
    messages: messages
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/abc' }),
  function (req, res) {
    console.log("Logged in successfully");
    console.log(req.user);
    res.redirect('/profile');
  });


router.get("/signup", (req, res) => {
  res.render('signup');
})


router.use(isAuthenticated);

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user });
})


module.exports = router;
