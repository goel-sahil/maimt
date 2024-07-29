const express = require('express');
const server = express.Router();

const userController = require('./controllers/users.controller')

server.get('/users', userController.handleGetUserReq);
