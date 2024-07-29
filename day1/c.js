const express = require('express');
const cRoutes = require('./c_routes')
const server = express();
server.use(json());
server.use('/a', cRoutes);
server.use('/b', cRoutes);
server.listen(8000);