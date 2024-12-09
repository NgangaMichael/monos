const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const Vendor = sequelize.define('Vendors', {
    businessName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = Vendor;