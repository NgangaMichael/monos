const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const User = sequelize.define('Users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = User;