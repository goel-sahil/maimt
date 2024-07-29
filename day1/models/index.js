const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'app', 'root', {
    host: 'localhost',
    dialect: 'mysql',

});

module.exports = sequelize;
