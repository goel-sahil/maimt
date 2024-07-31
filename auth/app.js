var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session')
const passport = require('passport');

const localStrategy = require('./middlewares/local.strategy');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
app.use('/', indexRouter);
app.use('/users', usersRouter);


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
