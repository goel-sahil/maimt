var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var flash = require('connect-flash');
const passport = require('passport');

// Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const addressRouter = require('./routes/address');

// Middleware
const isAuthenticated = require('./middlewares/is_authenticated.middleware');
const localStrategy = require('./middlewares/local.strategy');

var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);

app.use('/auth', authRouter);

// Middleware
app.use(isAuthenticated);

app.use('/users', userRouter);
app.use('/users/addresses', addressRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
