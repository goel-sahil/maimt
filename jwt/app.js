const express = require('express');
const path = require('path');
const passport = require('passport');
const createError = require('http-errors');

// Routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// Middleware and strategies
const jwtStrategy = require('./middlewares/jwt.strategy');
const authenticateJWT = require('./middlewares/auth.middleware');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Passport with the JWT strategy
passport.use(jwtStrategy);

// Routes
app.use('/auth', authRouter);
app.use('/users', authenticateJWT, usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
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
