const express = require('express');
const passport = require('passport');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');


// Routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// Middleware and strategies
const localStrategy = require('./middlewares/local.strategy');
const isAuthenticated = require('./middlewares/auth.middleware');

const app = express();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.messages = req.flash(); // Make flash messages available to all templates
  next();
});

passport.use(localStrategy);

// Routes
app.use('/auth', authRouter);
app.use(isAuthenticated);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = app;
