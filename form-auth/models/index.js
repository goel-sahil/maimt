const { Sequelize } = require('sequelize');
const config = require('../config/config')

const sequelize = new Sequelize({
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database_name,
    dialect: 'mysql',
    logging: console.log,
});

module.exports = sequelize;