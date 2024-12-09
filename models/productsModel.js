const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const Product = sequelize.define('Products', {
    vendorId: Sequelize.STRING,
    name: Sequelize.STRING,
    price: Sequelize.NUMBER
});

module.exports = Product;